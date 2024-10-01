import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnaHeader } from 'src/app/core/interfaces/columna-header.interface';

@Component({
  selector: 'azui-table',
  templateUrl: './azui-table.component.html',
  styleUrls: ['./azui-table.component.scss'],
})
export class AzuiTableComponent implements OnInit {
  @Input()
  totalData?: number;

  @Input()
  columnas!: ColumnaHeader[];

  @Input()
  cantidadFilasSkeleton = 6;

  @Input()
  nombreModulo?: string;

  @Input()
  etiquetaBoton?: string;

  @Input()
  mostrarBoton = true;

  @Input()
  esPaginado = false;

  @Input()
  routerLink?: string;

  @Output()
  noDataAction = new EventEmitter();

  skeleton: number[] = [];

  ngOnInit(): void {
    this.skeleton = Array.from(Array(this.cantidadFilasSkeleton).keys());
  }
}
