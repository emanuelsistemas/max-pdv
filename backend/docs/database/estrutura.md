# Estrutura do Banco de Dados - MaxPDV

## Visão Geral
O banco de dados do MaxPDV foi projetado para suportar um sistema SAAS (Software as a Service) com múltiplas contas e controle de acesso granular. A estrutura permite que cada conta (empresa) tenha seus próprios usuários, configurações e permissões.

## Tabelas Principais

### 1. empresas (Contas)
Armazena informações das empresas/contas que utilizam o sistema.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| id            | UUID          | Identificador único da empresa               |
| nome          | VARCHAR(255)  | Nome da empresa                             |
| documento     | VARCHAR(20)   | CNPJ ou CPF da empresa                      |
| email         | VARCHAR(255)  | Email principal da empresa                  |
| telefone      | VARCHAR(20)   | Telefone principal                         |
| status        | VARCHAR(20)   | Status da conta (ativa, suspensa, cancelada)|
| plano         | VARCHAR(20)   | Plano contratado (grátis, básico, premium) |
| limite_usuarios| INTEGER      | Número máximo de usuários permitidos        |
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |
| atualizado_em | TIMESTAMPTZ   | Data da última atualização                 |

### 2. usuarios
Armazena informações dos usuários do sistema.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| id            | UUID          | Identificador único do usuário               |
| empresa_id    | UUID          | ID da empresa à qual o usuário pertence     |
| nome          | VARCHAR(255)  | Nome completo do usuário                    |
| email         | VARCHAR(255)  | Email do usuário (único)                    |
| telefone      | VARCHAR(20)   | Telefone do usuário                        |
| senha_hash    | TEXT          | Hash da senha do usuário                    |
| status        | VARCHAR(20)   | Status do usuário (ativo, inativo, bloqueado)|
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |
| atualizado_em | TIMESTAMPTZ   | Data da última atualização                 |
| ultimo_login  | TIMESTAMPTZ   | Data/hora do último acesso                 |

### 3. perfis
Define os diferentes perfis de acesso disponíveis no sistema.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| id            | UUID          | Identificador único do perfil                |
| nome          | VARCHAR(50)   | Nome do perfil (admin, gerente, usuário)    |
| descricao     | TEXT          | Descrição detalhada do perfil               |
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |
| atualizado_em | TIMESTAMPTZ   | Data da última atualização                 |

### 4. permissoes
Define as permissões disponíveis no sistema.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| id            | UUID          | Identificador único da permissão             |
| nome          | VARCHAR(50)   | Nome da permissão                           |
| descricao     | TEXT          | Descrição da permissão                      |
| recurso       | VARCHAR(50)   | Recurso afetado (usuários, produtos, etc)   |
| acao          | VARCHAR(20)   | Ação permitida (criar, ler, atualizar, excluir)|
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |
| atualizado_em | TIMESTAMPTZ   | Data da última atualização                 |

### 5. perfil_permissoes
Relacionamento entre perfis e permissões.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| perfil_id     | UUID          | ID do perfil                                |
| permissao_id  | UUID          | ID da permissão                             |
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |

### 6. usuario_perfis
Relacionamento entre usuários e perfis, específico por empresa.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| usuario_id    | UUID          | ID do usuário                               |
| perfil_id     | UUID          | ID do perfil                                |
| empresa_id    | UUID          | ID da empresa                               |
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |

### 7. configuracoes_empresa
Configurações específicas de cada empresa.

| Campo          | Tipo          | Descrição                                    |
|---------------|---------------|----------------------------------------------|
| empresa_id    | UUID          | ID da empresa                               |
| configuracoes | JSONB         | Configurações em formato JSON               |
| criado_em     | TIMESTAMPTZ   | Data de criação do registro                |
| atualizado_em | TIMESTAMPTZ   | Data da última atualização                 |

## Relacionamentos

1. Um usuário pertence a uma empresa (usuarios.empresa_id → empresas.id)
2. Um usuário pode ter vários perfis em uma empresa (usuario_perfis)
3. Um perfil pode ter várias permissões (perfil_permissoes)
4. Cada empresa tem suas próprias configurações (configuracoes_empresa)

## Índices Importantes

- empresas(email)
- usuarios(email)
- usuarios(empresa_id)
- usuario_perfis(empresa_id, usuario_id)

## Observações de Segurança

1. Senhas são sempre armazenadas com hash (nunca em texto plano)
2. O campo configuracoes em configuracoes_empresa permite extensibilidade
3. Todas as tabelas têm controle de timestamps para auditoria
4. O status em empresas e usuarios permite controle granular de acesso
