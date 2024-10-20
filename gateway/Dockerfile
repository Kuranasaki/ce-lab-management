FROM kong:latest

USER root

RUN apt-get update && \
    apt-get install -y git unzip luarocks

RUN luarocks install lua-resty-jwt

RUN mkdir -p /usr/local/share/lua/5.1/kong/plugins/firebase-auth

COPY kong/plugins/firebase-auth/handler.lua /usr/local/share/lua/5.1/kong/plugins/firebase-auth/handler.lua
COPY kong/plugins/firebase-auth/schema.lua /usr/local/share/lua/5.1/kong/plugins/firebase-auth/schema.lua

USER kong