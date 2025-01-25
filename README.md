# MaxPDV - Sistema de PDV como Serviço (SAAS)

## Sobre o Projeto
MaxPDV é um sistema de Ponto de Venda (PDV) oferecido como serviço (SAAS), permitindo que múltiplas empresas gerenciem suas operações de forma independente e segura.

## Documentação

### 1. Configuração e Instalação
- [Configuração Inicial do Projeto](backend/docs/configuracao_inicial.md)
  - Configuração do ambiente
  - Setup do banco de dados
  - Estrutura do projeto
  - Deploy

### 2. Banco de Dados
- [Estrutura do Banco de Dados](backend/docs/database/estrutura.md)
  - Modelo de dados
  - Relacionamentos
  - Índices
  - Segurança

### 3. Estrutura do Projeto
```
/max-pdv/
├── backend/               # Backend do sistema
│   ├── api/              # API REST
│   ├── database/         # Scripts e migrations
│   └── docs/             # Documentação
├── criar-conta-app/      # Frontend - Criação de conta
└── landingpage/          # Frontend - Página inicial
```

## Começando

### Pré-requisitos
- Node.js 18.x
- PostgreSQL 17
- Docker (para deploy)

### Instalação para Desenvolvimento

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências do backend
```bash
cd backend/api
npm install
```

3. Configure o banco de dados
```bash
cd ../database
# Execute as migrations (instruções em backend/docs/database/estrutura.md)
```

4. Instale as dependências do frontend
```bash
cd ../../criar-conta-app
npm install
```

### Executando em Desenvolvimento

1. Backend API
```bash
cd backend/api
npm run dev
```

2. Frontend
```bash
cd criar-conta-app
npm run dev
```

## Contribuindo
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença [DEFINIR LICENÇA]

## Contato
Emanuel - [EMAIL]
Link do Projeto: [URL_DO_REPOSITORIO]
