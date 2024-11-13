package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"google.golang.org/api/option"
)

type UserInfo struct {
	ID    string   `json:"id"`
	Email string   `json:"email"`
	Roles []string `json:"roles"`
}

type AppContext struct {
	db            *sql.DB
	firebaseAuth  *auth.Client
}

var appCtx *AppContext

func initFirebase() (*auth.Client, error) {
	ctx := context.Background()
	opt := option.WithCredentialsFile(os.Getenv("FIREBASE_CREDENTIALS"))
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing firebase app: %v", err)
	}

	client, err := app.Auth(ctx)
	if err != nil {
		return nil, fmt.Errorf("error getting Auth client: %v", err)
	}

	return client, nil
}

func initDB() (*sql.DB, error) {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		return nil, fmt.Errorf("DATABASE_URL environment variable not set")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func initAppContext() error {
	// Initialize Firebase Auth
	firebaseAuth, err := initFirebase()
	if err != nil {
		return err
	}

	// Initialize Database
	db, err := initDB()
	if err != nil {
		return err
	}

	// Create app context
	appCtx = &AppContext{
		db:            db,
		firebaseAuth:  firebaseAuth,
	}

	return nil
}

func getUserRoles(ctx context.Context, userID string) ([]string, error) {
	rows, err := appCtx.db.QueryContext(ctx, `
		SELECT role_name 
		FROM user_roles 
		WHERE user_id = $1`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	roles := []string{
		"customer",
	}
	for rows.Next() {
		var role string
		if err := rows.Scan(&role); err != nil {
			return nil, err
		}
		roles = append(roles, role)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return roles, nil
}

func VerifySession(r *http.Request) (*UserInfo) {
	// cookie, err := r.Cookie("session")
	// if err != nil {
	// 	log.Printf("session cookies are not provided - %v", err)
	// 	return nil
	// }

	// token, err := appCtx.firebaseAuth.VerifySessionCookieAndCheckRevoked(r.Context(), cookie.Value)
	authHeader:= r.Header.Get("Authorization")
	splitToken := strings.Split(authHeader, "Bearer ")
	if len(splitToken) != 2 {
		log.Printf("Bearer token not in proper format")
		return nil
	}
	token, err := appCtx.firebaseAuth.VerifyIDToken(r.Context(), splitToken[1])
	if err != nil {
		log.Printf("Failed to verify ID token: %v", err)
		return nil
	}
	// Get user roles from PostgreSQL
	roles, err := getUserRoles(r.Context(), token.UID)
	if err != nil {
		log.Printf("Failed to get user roles: %v", err)
		// Don't fail the request if roles can't be fetched
		roles = []string{}
	}

	userInfo := &UserInfo{
		ID:    token.UID,
		Email: token.Claims["email"].(string),
		Roles: roles,
	}

	return userInfo
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	userInfo := VerifySession(r)
	
	if userInfo != nil {
		w.Header().Set("x-user-id", userInfo.ID)
		w.Header().Set("x-user-email", userInfo.Email)
		w.Header().Set("x-user-roles", strings.Join(userInfo.Roles, ","))
	}

	w.Header().Set("Content-Type", "application/json")
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		// Default empty headers for unauthenticated requests
		w.Header().Set("x-user-id", "")
		w.Header().Set("x-user-email", "")
		w.Header().Set("x-user-roles", "")
		
		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Validate required environment variables
	if os.Getenv("FIREBASE_CREDENTIALS") == "" {
		log.Fatal("FIREBASE_CREDENTIALS not set")
	}

	// Initialize application context
	if err := initAppContext(); err != nil {
		log.Fatalf("Failed to initialize application context: %v", err)
	}
	defer appCtx.db.Close()

	r := mux.NewRouter()
	r.Use(corsMiddleware)
	r.Headers("Content-Type", "application/json")
	r.HandleFunc("/auth", authHandler).Methods("GET", "OPTIONS")

	log.Printf("Main server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}