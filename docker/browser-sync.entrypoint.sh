#!/bin/sh
wait-for-it \
  client:15672 \
  -t 600 \
  -- browser-sync start \
    --config /source/config/browser-sync.js
