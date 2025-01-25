-- Adicionar índice único para nome em perfis
ALTER TABLE perfis ADD CONSTRAINT perfis_nome_key UNIQUE (nome);

-- Adicionar índice único para nome em permissoes
ALTER TABLE permissoes ADD CONSTRAINT permissoes_nome_key UNIQUE (nome);
