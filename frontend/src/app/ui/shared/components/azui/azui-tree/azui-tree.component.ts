import { Component, Input } from '@angular/core';
import { AzuiTree } from './azui-tree.interface';

@Component({
  selector: 'azui-tree',
  templateUrl: './azui-tree.component.html',
  styleUrls: ['./azui-tree.component.scss'],
})
export class AzuiTreeComponent {
  @Input()
  nodos!: AzuiTree[];

  @Input()
  maxHeight?: string;

  public nodoSeleccionado?: AzuiTree;

  seleccionarNodo = (nodo?: AzuiTree) => {
    this.toArray(this.nodos)
      .filter((e) => e.estaSeleccionado && e.id !== nodo?.id)
      .forEach((e) => (e.estaSeleccionado = false));
    this.nodoSeleccionado = nodo;
  };

  private toArray(nodos?: AzuiTree[]): AzuiTree[] {
    const responseArray: AzuiTree[] = [];

    if (!nodos || nodos.length === 0) return responseArray;

    responseArray.push(
      ...nodos.reduce<AzuiTree[]>((acum, value) => {
        acum.push(value);
        acum.push(...this.toArray(value.hijos));

        return acum;
      }, [])
    );

    return responseArray;
  }
}
