import express from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Configuração do pool de conexão
const pool = new Pool({
  host: 'dev.maxpdv.appbr.io',
  port: 5432,
  database: 'maxpdv',
  user: 'postgres',
  password: 'Vs949207@#$'
});

// Rota para criar nova conta (empresa + usuário admin)
router.post('/criar-conta', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { 
      empresa_nome, 
      empresa_documento, 
      empresa_email, 
      empresa_telefone,
      usuario_nome,
      usuario_email,
      usuario_telefone,
      usuario_senha
    } = req.body;

    // Verificar se já existe empresa com este email
    const empresaExistente = await client.query(
      'SELECT id FROM empresas WHERE email = $1',
      [empresa_email]
    );

    if (empresaExistente.rows.length > 0) {
      throw new Error('Já existe uma empresa cadastrada com este email');
    }

    // Verificar se já existe usuário com este email
    const usuarioExistente = await client.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [usuario_email]
    );

    if (usuarioExistente.rows.length > 0) {
      throw new Error('Já existe um usuário cadastrado com este email');
    }

    // Criar empresa
    const empresaResult = await client.query(
      `INSERT INTO empresas (nome, documento, email, telefone, status, plano, limite_usuarios)
       VALUES ($1, $2, $3, $4, 'ativa', 'gratis', 1)
       RETURNING id`,
      [empresa_nome, empresa_documento, empresa_email, empresa_telefone]
    );

    const empresa_id = empresaResult.rows[0].id;

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(usuario_senha, salt);

    // Criar usuário admin
    const usuarioResult = await client.query(
      `INSERT INTO usuarios (empresa_id, nome, email, telefone, senha_hash, status)
       VALUES ($1, $2, $3, $4, $5, 'ativo')
       RETURNING id`,
      [empresa_id, usuario_nome, usuario_email, usuario_telefone, senha_hash]
    );

    const usuario_id = usuarioResult.rows[0].id;

    // Buscar perfil admin
    const perfilResult = await client.query(
      "SELECT id FROM perfis WHERE nome = 'admin'"
    );

    if (perfilResult.rows.length > 0) {
      // Associar usuário ao perfil admin
      await client.query(
        `INSERT INTO usuario_perfis (usuario_id, perfil_id, empresa_id)
         VALUES ($1, $2, $3)`,
        [usuario_id, perfilResult.rows[0].id, empresa_id]
      );
    }

    // Criar configurações padrão da empresa
    await client.query(
      `INSERT INTO configuracoes_empresa (empresa_id, configuracoes)
       VALUES ($1, $2)`,
      [empresa_id, JSON.stringify({})]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Conta criada com sucesso',
      empresa_id,
      usuario_id
    });

  } catch (error) {
    await client.query('ROLLBACK');
    
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } finally {
    client.release();
  }
});

export default router;
