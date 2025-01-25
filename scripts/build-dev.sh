#!/bin/bash

# Build da imagem de desenvolvimento
docker build -t emanuelautomacao/max-pdv:developer -f Dockerfile.dev .

# Push para o Docker Hub
docker push emanuelautomacao/max-pdv:developer
