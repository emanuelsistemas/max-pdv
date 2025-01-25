export interface IEmpresa {
  id?: string;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  status?: string;
  plano?: string;
  limite_usuarios?: number;
  criado_em?: Date;
  atualizado_em?: Date;
}

export interface IEmpresaFiltros {
  status?: string;
  plano?: string;
  documento?: string;
  email?: string;
}
