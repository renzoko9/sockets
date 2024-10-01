import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiOptionComponent } from './azui-option/azui-option.component';
import { AzuiSelectComponent } from './azui-select.component';

@NgModule({
  declarations: [AzuiSelectComponent, AzuiOptionComponent],
  imports: [CommonModule, AzuiIcons, NzPopoverModule],
  exports: [AzuiSelectComponent, AzuiOptionComponent],
})
export class AzuiSelectModule {}
