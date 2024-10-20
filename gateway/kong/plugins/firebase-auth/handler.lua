local BasePlugin = require "kong.plugins.base_plugin"
local jwt = require "resty.jwt"
local http = require "resty.http"
local cjson = require "cjson"

local FirebaseAuthHandler = BasePlugin:extend()

FirebaseAuthHandler.PRIORITY = 1000
FirebaseAuthHandler.VERSION = "1.0.0"

function FirebaseAuthHandler:new()
  FirebaseAuthHandler.super.new(self, "firebase-auth")
end

function FirebaseAuthHandler:access(conf)
  FirebaseAuthHandler.super.access(self)
  
  local token = ngx.req.get_headers()["Authorization"]
  if not token then
    return kong.response.exit(401, { message = "No token provided" })
  end
  
  token = token:gsub("Bearer ", "")
  
  local httpc = http.new()
  local res, err = httpc:request_uri("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com", {
    method = "GET",
    headers = {
      ["Content-Type"] = "application/json",
    },
  })
  
  if not res then
    return kong.response.exit(500, { message = "Failed to fetch Firebase public keys" })
  end
  
  local public_keys = cjson.decode(res.body)
  local jwt_obj = jwt:verify(public_keys, token)
  
  if not jwt_obj.verified then
    return kong.response.exit(401, { message = "Invalid token" })
  end
  
  -- Token is valid, you can now access claims like this:
  -- local user_id = jwt_obj.payload.user_id
  
  -- Set the user ID as a header for upstream services
  ngx.req.set_header("X-User-ID", jwt_obj.payload.user_id)
end

return FirebaseAuthHandler