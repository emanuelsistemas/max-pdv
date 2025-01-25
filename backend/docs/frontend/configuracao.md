# Documentação Frontend - MaxPDV

## 1. Estrutura do Projeto Frontend

### 1.1. Múltiplos Aplicativos
O projeto possui dois aplicativos React independentes:
```
/max-pdv/
├── landingpage/          # Página inicial
└── criar-conta-app/      # Página de criação de conta
```

### 1.2. Tecnologias Utilizadas
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## 2. Configuração do Ambiente de Desenvolvimento

### 2.1. Configuração do Vite
Para cada aplicativo, o arquivo `vite.config.ts` precisa ser configurado:

```typescript
// landingpage/vite.config.ts
export default defineConfig({
  base: '/',
  build: {
    outDir: '../dist/landingpage',
    assetsDir: 'assets'
  }
});

// criar-conta-app/vite.config.ts
export default defineConfig({
  base: '/criar-conta/',
  build: {
    outDir: '../dist/criar-conta',
    assetsDir: 'assets'
  }
});
```

### 2.2. Configuração do Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Configurações personalizadas
    }
  }
}
```

## 3. Gestão de Branches e Ambientes

### 3.1. Branches Principais
- `main`: Produção
- `developer`: Desenvolvimento/Homologação

### 3.2. Fluxo de Trabalho
1. Desenvolvimento de features:
   ```bash
   git checkout -b feature/nome-da-feature developer
   # Desenvolvimento
   git commit -m "feat: descrição da feature"
   git push origin feature/nome-da-feature
   # Pull Request para developer
   ```

2. Correções de bugs:
   ```bash
   git checkout -b fix/descricao-do-bug developer
   # Correção
   git commit -m "fix: descrição da correção"
   git push origin fix/descricao-do-bug
   # Pull Request para developer
   ```

### 3.3. Ambientes
1. **Desenvolvimento** (dev.maxpdv.appbr.io)
   - Branch: developer
   - Imagem Docker: emanuelautomacao/max-pdv:developer

2. **Produção** (maxpdv.appbr.io)
   - Branch: main
   - Imagem Docker: emanuelautomacao/max-pdv:latest

## 4. Configuração do Docker

### 4.1. Dockerfile
```dockerfile
# Build stage
FROM node:18 as builder

WORKDIR /app

# Copiar e buildar landing page
COPY landingpage/ ./landingpage/
RUN cd landingpage && npm install && npm run build

# Copiar e buildar página de criação de conta
COPY criar-conta-app/ ./criar-conta-app/
RUN cd criar-conta-app && npm install && npm run build

# Production stage
FROM nginx:alpine

# Copiar builds
COPY --from=builder /app/dist/landingpage /usr/share/nginx/html
COPY --from=builder /app/dist/criar-conta /usr/share/nginx/html/criar-conta

# Configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### 4.2. Nginx Configuration
```nginx
server {
    listen 80;
    server_name localhost;

    # Landing Page
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Criar Conta App
    location /criar-conta/ {
        alias /usr/share/nginx/html/criar-conta/;
        try_files $uri $uri/ /criar-conta/index.html;
    }

    # Assets da Landing Page
    location /assets/ {
        root /usr/share/nginx/html;
        try_files $uri =404;
    }

    # Assets do Criar Conta
    location /criar-conta/assets/ {
        alias /usr/share/nginx/html/criar-conta/assets/;
        try_files $uri =404;
    }
}
```

## 5. Deploy

### 5.1. Build e Push da Imagem Docker
```bash
# Build da imagem
docker build -t emanuelautomacao/max-pdv:developer .

# Push para o Docker Hub
docker push emanuelautomacao/max-pdv:developer
```

### 5.2. Deploy no EasyPanel
1. Acessar o EasyPanel
2. Selecionar o serviço MaxPDV
3. Atualizar a imagem para a nova versão
4. Aguardar a atualização do container

### 5.3. Verificação do Deploy
1. Verificar logs no EasyPanel
2. Testar acesso às URLs:
   - dev.maxpdv.appbr.io
   - dev.maxpdv.appbr.io/criar-conta/

## 6. Problemas Comuns e Soluções

### 6.1. Assets não Carregando
**Problema**: Assets (CSS, JS, imagens) não carregam após o deploy.
**Solução**: 
1. Verificar configuração do `base` no `vite.config.ts`
2. Confirmar paths corretos no nginx.conf
3. Limpar cache do navegador

### 6.2. Rotas não Funcionando
**Problema**: Erro 404 ao acessar rotas diretamente.
**Solução**:
1. Verificar configuração do `try_files` no nginx.conf
2. Confirmar que o `location` está correto para cada aplicativo

### 6.3. Problemas de CORS
**Problema**: Erros de CORS ao chamar a API.
**Solução**:
1. Adicionar headers corretos no nginx.conf
2. Verificar configuração do CORS na API

## 7. Manutenção

### 7.1. Atualizações de Dependências
```bash
# Verificar atualizações disponíveis
npm outdated

# Atualizar dependências
npm update
```

### 7.2. Limpeza
```bash
# Remover builds antigos
rm -rf dist/

# Limpar cache do npm
npm cache clean --force
```

### 7.3. Monitoramento
1. Verificar logs do Nginx
2. Monitorar performance no Chrome DevTools
3. Verificar métricas no EasyPanel

## 8. Boas Práticas

### 8.1. Código
- Usar TypeScript para type safety
- Seguir padrões do ESLint
- Documentar componentes complexos
- Manter testes atualizados

### 8.2. Git
- Commits semânticos
- Pull Requests descritivos
- Code review obrigatório
- Manter branches atualizadas

### 8.3. Performance
- Lazy loading de componentes
- Otimização de imagens
- Minificação de assets
- Caching adequado
