#!/usr/bin/env bash

python3 -m venv .venv
source .venv/bin/activate
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
pip install -r backend/requirements.txt
npm install concurrently
npm install react-scripts --prefix hackathon
npm run dev