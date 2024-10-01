import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiButton } from '../azui-button/azui-button.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'azui-vacio',
  standalone: true,
  imports: [CommonModule, AzuiIcons, AzuiButton, RouterModule],
  templateUrl: './azui-vacio.component.html',
  styleUrls: ['./azui-vacio.component.scss'],
})
export class AzuiVacioComponent {
  @Input()
  tipo: 'no-resultados' | 'no-data' = 'no-data';

  @Input()
  nombreModulo!: string;

  @Input()
  etiquetaBoton!: string;

  @Input()
  routerLink?: string;

  @Output()
  noDataAction = new EventEmitter();
}
