export interface IUsuario {
  id?: string;
  empresa_id: string;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
  senha_hash?: string;
  status?: string;
  criado_em?: Date;
  atualizado_em?: Date;
  ultimo_login?: Date;
}

export interface IUsuarioFiltros {
  empresa_id?: string;
  status?: string;
  email?: string;
}
