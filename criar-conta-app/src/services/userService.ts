import { pool } from '../config/database';
import bcrypt from 'bcryptjs';

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class UserService {
  static async createUser(userData: CreateUserData) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Verificar se o email já existe
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Hash da senha
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(userData.password, salt);

      // Inserir usuário
      const result = await client.query(
        `INSERT INTO users (name, email, phone, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, phone, created_at`,
        [userData.name, userData.email, userData.phone, passwordHash]
      );

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
