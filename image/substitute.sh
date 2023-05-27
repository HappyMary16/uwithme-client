#!/bin/bash

SCHEMA=http://

if [ "$SSL_ENABLED" = "true" ]; then
    SCHEMA=https://
fi

export SCHEMA="${SCHEMA}"

envsubst < env.template.js > env.js