#!/bin/bash
pm2 start --interpreter ./server.js --watch --ignore-watch='node_modules'

pm2 logs
