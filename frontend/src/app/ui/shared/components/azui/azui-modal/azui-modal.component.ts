import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AzuiButton } from '../azui-button/azui-button.directive';

@Component({
  selector: 'azui-modal',
  standalone: true,
  imports: [CommonModule, NzModalModule, AzuiButton],
  templateUrl: './azui-modal.component.html',
  styleUrls: ['./azui-modal.component.scss'],
})
export class AzuiModalComponent {
  @Input()
  isVisible!: boolean;

  @Input()
  handleCancel!: Function;

  /**
   * Por defecto es true
   */
  @Input()
  estaCentrado: boolean = true;

  @Input()
  titulo?: string;

  @Input()
  descripcion?: string;

  @Input()
  etiquetaCancelar?: string;

  @Input()
  etiquetaAceptar?: string;

  @Input()
  width?: string;

  @Input()
  maxWidth?: string;

  @Output()
  submit = new EventEmitter<boolean>();
}
