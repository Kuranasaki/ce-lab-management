FROM kong:latest

USER root

RUN apt-get update && \
    apt-get install -y git unzip luarocks 
RUN apt-get install -y libssl-dev

RUN luarocks install luaossl
RUN luarocks install lua-resty-jwt
# RUN luarocks install openssl

# RUN ls -la /usr/local/share/lua/5.1
# RUN ls -la /usr/local/lib/lua/5.1
# RUN luarocks install https://github.com/hpsony94/kong-plugin-jwt-firebase/releases/download/1.0.0-1/kong-plugin-jwt-firebase-1.0.0-1.all.rock
ADD ./kong-plugin-firebase-auth-1.0.0-1.all.rock /tmp/kong-plugin-firebase-auth-1.0.0-1.all.rock
RUN luarocks install /tmp/kong-plugin-firebase-auth-1.0.0-1.all.rock
# RUN mkdir -p /usr/local/share/lua/5.1/kong/plugins/firebase-auth

# COPY kong/plugins/firebase-auth/handler.lua /usr/local/share/lua/5.1/kong/plugins/firebase-auth/handler.lua
# COPY kong/plugins/firebase-auth/schema.lua /usr/local/share/lua/5.1/kong/plugins/firebase-auth/schema.lua

USER kong