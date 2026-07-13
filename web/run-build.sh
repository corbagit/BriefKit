#!/bin/bash
cd /home/team/shared/briefkit/web
npx vite build 2>&1
echo "BUILD_EXIT_CODE=$?"