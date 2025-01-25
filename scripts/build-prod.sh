#!/bin/bash

# Build da imagem de produção
docker build -t emanuelautomacao/max-pdv:latest -f Dockerfile.prod .

# Push para o Docker Hub
docker push emanuelautomacao/max-pdv:latest
