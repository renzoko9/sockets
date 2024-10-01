import { Component, Input } from '@angular/core';

@Component({
  selector: 'azui-table-row',
  templateUrl: './azui-table-row.component.html',
  styleUrls: ['./azui-table-row.component.scss'],
})
export class AzuiTableRowComponent {
  @Input()
  estaSeleccionado = false;
}
