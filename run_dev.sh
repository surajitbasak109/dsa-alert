#!/bin/bash

# Navigate to the frontend directory and run pnpm dev
cd ~/Desktop/codes/dsa-alert/frontend
pnpm dev &

# Navigate to the backend directory and run pnpm dev
cd ../backend
pnpm dev &

# Wait for both processes to finish
wait
