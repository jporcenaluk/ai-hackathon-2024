#!/usr/bin/env bash
# backend
python3 -m venv .venv
source .venv/bin/activate
pip install phidata ollama lancedb pandas sqlalchemy openai pypdf 
pip install -U pgvector pypdf "psycopg[binary]" sqlalchemy phidata
ollama pull llama3:8b
ollama pull nomic-embed-text
pip install -r backend/requirements.txt

# frontend
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# start app
npm install concurrently
npm install react-scripts --prefix hackathon
npm run dev