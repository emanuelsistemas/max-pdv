-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de empresas
CREATE TABLE empresas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    documento VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'ativa',
    plano VARCHAR(20) NOT NULL DEFAULT 'gratis',
    limite_usuarios INTEGER NOT NULL DEFAULT 1,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE usuarios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    empresa_id UUID NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo',
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMPTZ,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabela de perfis
CREATE TABLE perfis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de permissões
CREATE TABLE permissoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    recurso VARCHAR(50) NOT NULL,
    acao VARCHAR(20) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relacionamento entre perfis e permissões
CREATE TABLE perfil_permissoes (
    perfil_id UUID NOT NULL,
    permissao_id UUID NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (perfil_id, permissao_id),
    FOREIGN KEY (perfil_id) REFERENCES perfis(id),
    FOREIGN KEY (permissao_id) REFERENCES permissoes(id)
);

-- Tabela de relacionamento entre usuários e perfis
CREATE TABLE usuario_perfis (
    usuario_id UUID NOT NULL,
    perfil_id UUID NOT NULL,
    empresa_id UUID NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, perfil_id, empresa_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (perfil_id) REFERENCES perfis(id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabela de configurações da empresa
CREATE TABLE configuracoes_empresa (
    empresa_id UUID PRIMARY KEY,
    configuracoes JSONB NOT NULL DEFAULT '{}',
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Índices
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_empresa ON usuarios(empresa_id);
CREATE INDEX idx_usuario_perfis_empresa ON usuario_perfis(empresa_id);

-- Função para atualizar o campo atualizado_em
CREATE OR REPLACE FUNCTION atualizar_campo_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar o campo atualizado_em
CREATE TRIGGER atualizar_empresas_atualizado_em
    BEFORE UPDATE ON empresas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_campo_atualizado_em();

CREATE TRIGGER atualizar_usuarios_atualizado_em
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_campo_atualizado_em();

CREATE TRIGGER atualizar_perfis_atualizado_em
    BEFORE UPDATE ON perfis
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_campo_atualizado_em();

CREATE TRIGGER atualizar_permissoes_atualizado_em
    BEFORE UPDATE ON permissoes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_campo_atualizado_em();

CREATE TRIGGER atualizar_configuracoes_empresa_atualizado_em
    BEFORE UPDATE ON configuracoes_empresa
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_campo_atualizado_em();

-- Comentários nas tabelas
COMMENT ON TABLE empresas IS 'Tabela de empresas/contas que utilizam o sistema';
COMMENT ON TABLE usuarios IS 'Tabela de usuários do sistema';
COMMENT ON TABLE perfis IS 'Perfis de acesso disponíveis no sistema';
COMMENT ON TABLE permissoes IS 'Permissões disponíveis no sistema';
COMMENT ON TABLE perfil_permissoes IS 'Relacionamento entre perfis e permissões';
COMMENT ON TABLE usuario_perfis IS 'Relacionamento entre usuários e perfis por empresa';
COMMENT ON TABLE configuracoes_empresa IS 'Configurações específicas de cada empresa';
