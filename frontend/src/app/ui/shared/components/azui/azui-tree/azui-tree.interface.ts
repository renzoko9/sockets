export interface AzuiTree {
  id: number | string;
  label: string;
  iconoHoja?: string;
  hijos?: AzuiTree[];
  estaSeleccionado?: boolean;
  estaExpandido?: boolean;
}

export type AzuiTreeSeleccion = (nodo?: AzuiTree) => void;
