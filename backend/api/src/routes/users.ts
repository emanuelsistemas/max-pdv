import express from 'express';
import { db } from '../../../database/src/interface';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/users', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const result = await db.transaction(async (client) => {
      // Verificar email duplicado
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Hash da senha
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Inserir usuário
      const result = await client.query(
        `INSERT INTO users (name, email, phone, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, phone, created_at`,
        [name, email, phone, passwordHash]
      );

      return result.rows[0];
    });

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});

export default router;
