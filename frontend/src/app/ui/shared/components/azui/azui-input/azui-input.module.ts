import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiInputGroupComponent } from './azui-input-group/azui-input-group.component';
import { AzuiInputDirective } from './azui-input.directive';

@NgModule({
  declarations: [AzuiInputGroupComponent, AzuiInputDirective],
  imports: [CommonModule],
  exports: [AzuiInputGroupComponent, AzuiInputDirective],
})
export class AzuiInputModule {}
