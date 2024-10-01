import { Pipe, PipeTransform } from '@angular/core';
import { TipoRepuestaEnum } from 'src/app/core/enums/tipo-respuesta.enum';

@Pipe({
  name: 'tipoIconoAlerta',
})
export class TipoIconoAlertaPipe implements PipeTransform {
  transform(tipoRepuesta: TipoRepuestaEnum): string {
    if (tipoRepuesta === TipoRepuestaEnum.Success) return 'check';
    if (tipoRepuesta === TipoRepuestaEnum.Warning) return 'alerta';
    if (tipoRepuesta === TipoRepuestaEnum.Error) return 'equis';
    if (tipoRepuesta === TipoRepuestaEnum.Primary) return 'portal-quipu';

    return 'info';
  }
}
