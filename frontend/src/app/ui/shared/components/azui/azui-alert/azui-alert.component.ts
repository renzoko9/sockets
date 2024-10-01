import { Component, Input } from '@angular/core';
import { TipoRepuestaEnum } from 'src/app/core/enums/tipo-respuesta.enum';

@Component({
  selector: 'azui-alert',
  templateUrl: './azui-alert.component.html',
  styleUrls: ['./azui-alert.component.scss'],
})
export class AzuiAlertComponent {
  @Input()
  tipoAlerta?: TipoRepuestaEnum = TipoRepuestaEnum.Neutral;

  @Input()
  titulo?: string;

  @Input()
  descripcion?: string;

  @Input()
  size: 'normal' | 'small' = 'normal';

  public readonly TipoRepuestaType = TipoRepuestaEnum;
}
