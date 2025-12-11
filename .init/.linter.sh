#!/bin/bash
cd /home/kavia/workspace/code-generation/futuristic-question-hub-50490-50499/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

