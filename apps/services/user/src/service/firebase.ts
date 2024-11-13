import * as admin from 'firebase-admin';
const serviceAccount = require('../../config/firebase-fcking-nkpt.json');
export async function initializeFirebase(): Promise<void> {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export async function getOrCreateFirebaseUser(email: string, displayName: string, uid: string): Promise<admin.auth.UserRecord> {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (error) {
    return await admin.auth().createUser({
      email,
      displayName,
      uid,
    });
  }
}

export async function createCustomToken(uid: string, claims: object): Promise<string> {
  return admin.auth().createCustomToken(uid, claims);
}