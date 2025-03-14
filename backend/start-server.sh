#!/bin/bash
echo "Killing any process using port 5000..."
node killPort.js
echo "Starting server..."
npm run dev 