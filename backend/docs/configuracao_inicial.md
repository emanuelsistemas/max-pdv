# Configuração Inicial do Projeto MaxPDV

## 1. Estrutura do Projeto
```
/root/projetos/max-pdv/
├── backend/
│   ├── database/          # Gerenciamento do banco de dados
│   ├── api/              # API REST
│   └── docs/             # Documentação
├── criar-conta-app/      # Frontend da página de criação de conta
└── landingpage/          # Frontend da página inicial
```

## 2. Configuração do Banco de Dados (PostgreSQL no EasyPanel)

### 2.1. Criação do Serviço
1. No EasyPanel, criar novo serviço PostgreSQL com as seguintes configurações:
   - Service Name: dbmaxpdv
   - Database Name: maxpdv
   - User: postgres
   - Password: Vs949207@#$
   - Versão: postgres:17

### 2.2. Exposição do Serviço
1. Na configuração do serviço, habilitar acesso externo:
   - Em "Expose", definir porta pública: 5432
   - O serviço ficou acessível através de:
     - Host interno: max-pdv_dbmaxpdv
     - Host público: dev.maxpdv.appbr.io
     - Porta: 5432

### 2.3. Credenciais de Conexão
```
Host: dev.maxpdv.appbr.io
Port: 5432
Database: maxpdv
User: postgres
Password: Vs949207@#$
```

### 2.4. URL de Conexão
```
postgres://postgres:Vs949207@#$@dev.maxpdv.appbr.io:5432/maxpdv
```

## 3. Configuração do Ambiente de Desenvolvimento

### 3.1. Dependências Necessárias
- Node.js 18.x
- PostgreSQL Client
- TypeScript

### 3.2. Instalação de Ferramentas
```bash
# Instalação do cliente PostgreSQL
apt-get update && apt-get install -y postgresql-client
```

### 3.3. Verificação da Conexão
Para testar a conexão com o banco:
```bash
PGPASSWORD='Vs949207@#$' psql -h dev.maxpdv.appbr.io -p 5432 -U postgres -d maxpdv
```

## 4. Estrutura do Backend

### 4.1. Banco de Dados
- Localização dos scripts: `/backend/database/migrations/`
- Documentação da estrutura: `/backend/docs/database/estrutura.md`
- Interface de acesso: `/backend/database/src/interface.ts`

### 4.2. API
- Servidor Express com TypeScript
- Estrutura modular por recursos
- Autenticação e autorização baseada em perfis

## 5. Frontend

### 5.1. Página de Criação de Conta
- Localização: `/criar-conta-app/`
- Framework: React com TypeScript
- Estilização: Tailwind CSS

### 5.2. Landing Page
- Localização: `/landingpage/`
- Framework: React com TypeScript
- Estilização: Tailwind CSS

## 6. Deploy

### 6.1. Configuração do Nginx
- Arquivo de configuração: `/nginx.conf`
- Rotas configuradas:
  - `/` → Landing Page
  - `/criar-conta/` → Página de criação de conta

### 6.2. Docker
- Arquivo de configuração: `/Dockerfile`
- Imagem base: nginx
- Processo de build:
  1. Build das aplicações React
  2. Cópia dos arquivos para a imagem
  3. Configuração do Nginx

## 7. Próximos Passos
1. Executar scripts de migração do banco de dados
2. Configurar ambiente de desenvolvimento
3. Implementar autenticação e autorização
4. Desenvolver interface de administração

## 8. Observações de Segurança
1. As credenciais do banco de dados devem ser tratadas como sensíveis
2. A exposição da porta 5432 deve ser monitorada
3. Implementar SSL/TLS para conexões com o banco
4. Manter backups regulares do banco de dados

## 9. Manutenção
1. Monitorar logs do EasyPanel
2. Verificar regularmente atualizações de segurança
3. Manter documentação atualizada
4. Realizar backups periódicos
