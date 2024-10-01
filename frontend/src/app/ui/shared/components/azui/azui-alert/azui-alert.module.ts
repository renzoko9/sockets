import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiAlertComponent } from './azui-alert.component';
import { TipoIconoAlertaPipe } from './pipes/tipo-icono-alerta.pipe';

@NgModule({
  declarations: [AzuiAlertComponent, TipoIconoAlertaPipe],
  imports: [CommonModule, AzuiIcons],
  exports: [AzuiAlertComponent],
})
export class AzuiAlertModule {}
