import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AzuiButton } from '../azui-button/azui-button.directive';

@Component({
  selector: 'azui-modal-confirmacion',
  standalone: true,
  imports: [CommonModule, NzModalModule, AzuiButton],
  templateUrl: './azui-modal-confirmacion.component.html',
  styleUrls: ['./azui-modal-confirmacion.component.scss'],
})
export class AzuiModalConfirmacionComponent {
  @Input()
  isVisible!: boolean;

  @Input()
  handleCancel!: Function;

  @Input()
  maxWidth = '1000px';

  @Input()
  maxHeight = '600px';

  @Input()
  titulo!: string;

  @Input()
  subtitulo!: string;

  @Input()
  etiquetaCancelar?: string;

  @Input()
  etiquetaAceptar?: string;

  @Output()
  submit = new EventEmitter<boolean>();
}
