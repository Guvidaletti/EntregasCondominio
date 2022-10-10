export enum TipoUsuario {
  Seguranca = 'SEGURANCA',
  Porteiro = 'PORTEIRO',
}

export type UsuarioType = {
  id?: number;
  tipo: TipoUsuario;
  nome: string;
  iniciais: string;
};

export interface UsuarioEntregaRetiradaType extends UsuarioType {
  entregas: EntregaType[];
  retiradas: RetiradaType[];
}

export type CasaType = {
  id: number;
};

export type EntregaType = {
  id: number;
  dataHora: number;
  descricao: string;
  casaId: number;
  casasId: number;
  usuarioId: number;
  usuariosId: number;
};

export type RetiradaType = {
  id: number;
  dataHora: number;
  entregaId: number;
  entregasId: number;
  residenteId: number;
  residentesId: number;
  usuarioId: number;
  usuariosId: number;
};

export type ResidenteType = {
  id: number;
  nome: string;
  casaId: number;
  casasId: number;
  status: boolean;
};
