#!/bin/bash

# Nome da stack e serviço (definidos no docker-compose e no comando de deploy)
STACK_NAME="solai"
SERVICE_NAME="solai_sol_landing_page"

echo "🚀 Iniciando processo de Build para Solai Landing Page..."

# 1. Build da imagem localmente sem cache para garantir atualizações
docker build --no-cache -t sol-landing-page:latest .

echo "✅ Build concluído com sucesso!"
