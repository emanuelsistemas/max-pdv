import { db } from '../../../database/src/interface';
import { IEmpresa, IEmpresaFiltros } from '../types/empresa';

export class EmpresaService {
  static async criar(dados: IEmpresa): Promise<IEmpresa> {
    return await db.transaction(async (client) => {
      // Verificar email duplicado
      const empresaExistente = await client.query(
        'SELECT id FROM empresas WHERE email = $1',
        [dados.email]
      );

      if (empresaExistente.rows.length > 0) {
        throw new Error('Email já cadastrado');
      }

      // Inserir empresa
      const result = await client.query(
        `INSERT INTO empresas (nome, documento, email, telefone, status, plano, limite_usuarios)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          dados.nome,
          dados.documento,
          dados.email,
          dados.telefone,
          dados.status || 'ativa',
          dados.plano || 'gratis',
          dados.limite_usuarios || 1
        ]
      );

      return result.rows[0];
    });
  }

  static async atualizar(id: string, dados: Partial<IEmpresa>): Promise<IEmpresa> {
    return await db.transaction(async (client) => {
      // Verificar se empresa existe
      const empresaExistente = await client.query(
        'SELECT id FROM empresas WHERE id = $1',
        [id]
      );

      if (empresaExistente.rows.length === 0) {
        throw new Error('Empresa não encontrada');
      }

      // Verificar email duplicado se estiver sendo atualizado
      if (dados.email) {
        const emailExistente = await client.query(
          'SELECT id FROM empresas WHERE email = $1 AND id != $2',
          [dados.email, id]
        );

        if (emailExistente.rows.length > 0) {
          throw new Error('Email já cadastrado');
        }
      }

      // Construir query de atualização
      const campos = Object.keys(dados).filter(key => dados[key] !== undefined);
      const valores = campos.map(key => dados[key]);
      const sets = campos.map((campo, index) => `${campo} = $${index + 2}`);

      const query = `
        UPDATE empresas 
        SET ${sets.join(', ')}
        WHERE id = $1
        RETURNING *
      `;

      const result = await client.query(query, [id, ...valores]);
      return result.rows[0];
    });
  }

  static async buscarPorId(id: string): Promise<IEmpresa | null> {
    const result = await db.query(
      'SELECT * FROM empresas WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async listar(filtros: IEmpresaFiltros = {}): Promise<IEmpresa[]> {
    const condicoes = [];
    const valores = [];
    let contador = 1;

    if (filtros.status) {
      condicoes.push(`status = $${contador}`);
      valores.push(filtros.status);
      contador++;
    }

    if (filtros.plano) {
      condicoes.push(`plano = $${contador}`);
      valores.push(filtros.plano);
      contador++;
    }

    if (filtros.documento) {
      condicoes.push(`documento = $${contador}`);
      valores.push(filtros.documento);
      contador++;
    }

    if (filtros.email) {
      condicoes.push(`email = $${contador}`);
      valores.push(filtros.email);
      contador++;
    }

    const where = condicoes.length > 0 ? `WHERE ${condicoes.join(' AND ')}` : '';
    const query = `SELECT * FROM empresas ${where} ORDER BY criado_em DESC`;

    const result = await db.query(query, valores);
    return result.rows;
  }

  static async excluir(id: string): Promise<void> {
    await db.transaction(async (client) => {
      // Verificar se existem usuários
      const usuarios = await client.query(
        'SELECT id FROM usuarios WHERE empresa_id = $1',
        [id]
      );

      if (usuarios.rows.length > 0) {
        throw new Error('Não é possível excluir empresa com usuários cadastrados');
      }

      // Excluir empresa
      const result = await client.query(
        'DELETE FROM empresas WHERE id = $1',
        [id]
      );

      if (result.rowCount === 0) {
        throw new Error('Empresa não encontrada');
      }
    });
  }
}
