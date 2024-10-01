import { Component, Input } from '@angular/core';
import { AzuiTree, AzuiTreeSeleccion } from '../azui-tree.interface';

@Component({
  selector: 'azui-tree-node',
  templateUrl: './azui-tree-node.component.html',
  styleUrls: ['./azui-tree-node.component.scss'],
})
export class AzuiTreeNodeComponent {
  @Input()
  nodo!: AzuiTree;

  @Input()
  esRaiz = false;

  @Input()
  paddingLeft: number = 24;

  @Input()
  nivel!: number;

  @Input()
  seleccionElemento!: AzuiTreeSeleccion;

  esClicUnico = true;
  t: any;

  handleClicElement() {
    this.esClicUnico = true;
    this.t = setTimeout(() => {
      if (this.esClicUnico) {
        this.nodo.estaSeleccionado = !this.nodo.estaSeleccionado;
        if (this.nodo.estaSeleccionado) this.seleccionElemento(this.nodo);
      }
      clearTimeout(this.t);
    }, 200);
  }

  handleDoubleClicElement() {
    this.esClicUnico = false;
    this.expandirNodo();
  }

  expandirNodo(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.nodo.estaExpandido = !this.nodo.estaExpandido;
  }
}
