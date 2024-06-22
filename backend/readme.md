
virtualenv -p python3.10 venv

source venv/bin/activate

pip install phidata ollama lancedb pandas sqlalchemy openai pgvector pypdf "psycopg[binary]" sqlalchemy phidata

pip install -U pgvector pypdf "psycopg[binary]" sqlalchemy phidata

ollama pull llama3:8b
ollama pull nomic-embed-text

```shell
docker run -d \
  -e POSTGRES_DB=ai \
  -e POSTGRES_USER=ai \
  -e POSTGRES_PASSWORD=ai \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v pgvolume:/var/lib/postgresql/data \
  -p 5532:5432 \
  --name pgvector \
  phidata/pgvector:16
```

curl -X POST http://localhost:5200/ask -H "Content-Type: application/json" -d '{"prompt": "What is the capital of France?"}'
