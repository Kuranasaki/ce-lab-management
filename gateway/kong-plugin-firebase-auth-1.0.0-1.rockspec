package = "kong-plugin-firebase-auth"
version = "1.0.0-1"
source = {
  url = "https://github.com/hpsony94/kong-plugin-jwt-firebase",
}
description = {
  summary = "This plugin allows Kong to verify JWT Firebase Token.",
  license = "Apache 2.0"
}
dependencies = {
  "lua >= 5.1",
  --"kong >= 1.1"
}
build = {
  type = "builtin",
  modules = {
    ["kong.plugins.firebase-auth.handler"] = "kong/plugins/firebase-auth/handler.lua",
    ["kong.plugins.firebase-auth.schema"]  = "kong/plugins/firebase-auth/schema.lua",
    ["kong.plugins.firebase-auth.constants"] = "kong/plugins/firebase-auth/constants.lua"
  }
}
