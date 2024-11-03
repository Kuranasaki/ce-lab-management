FROM kong:latest

USER root

RUN apt-get update && \
    apt-get install -y git unzip luarocks 
RUN apt-get install -y libssl-dev

RUN luarocks install luaossl
RUN luarocks install lua-resty-jwt

ADD ./kong-plugin-firebase-auth-1.0.0-1.all.rock /tmp/kong-plugin-firebase-auth-1.0.0-1.all.rock
RUN luarocks install /tmp/kong-plugin-firebase-auth-1.0.0-1.all.rock

USER kong