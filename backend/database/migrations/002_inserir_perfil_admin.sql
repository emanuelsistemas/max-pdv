-- Inserir perfil admin
INSERT INTO perfis (nome, descricao)
VALUES (
  'admin',
  'Administrador do sistema com acesso total às funcionalidades'
)
ON CONFLICT (nome) DO NOTHING;

-- Inserir permissões básicas
INSERT INTO permissoes (nome, descricao, recurso, acao)
VALUES 
  ('gerenciar_usuarios', 'Gerenciar usuários do sistema', 'usuarios', 'todas'),
  ('gerenciar_configuracoes', 'Gerenciar configurações da empresa', 'configuracoes', 'todas'),
  ('gerenciar_perfis', 'Gerenciar perfis e permissões', 'perfis', 'todas')
ON CONFLICT (nome) DO NOTHING;

-- Associar permissões ao perfil admin
INSERT INTO perfil_permissoes (perfil_id, permissao_id)
SELECT p.id as perfil_id, pm.id as permissao_id
FROM perfis p
CROSS JOIN permissoes pm
WHERE p.nome = 'admin'
ON CONFLICT DO NOTHING;
