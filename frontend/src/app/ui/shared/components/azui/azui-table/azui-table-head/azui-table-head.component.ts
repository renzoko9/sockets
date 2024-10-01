import { Component, Input } from '@angular/core';
import { ColumnaHeader } from 'src/app/core/interfaces/columna-header.interface';

@Component({
  selector: 'azui-table-head',
  templateUrl: './azui-table-head.component.html',
  styleUrls: ['./azui-table-head.component.scss'],
})
export class AzuiTableHeadComponent {
  @Input()
  columnas!: ColumnaHeader[];
}
