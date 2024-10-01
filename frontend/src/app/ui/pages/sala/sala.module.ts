import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaRoutingModule } from './sala-routing.module';
import { SalaComponent } from './sala.component';
import { AzuiButton } from '../../shared/components/azui/azui-button/azui-button.directive';
import { AzuiInputModule } from '../../shared/components/azui/azui-input/azui-input.module';
import { AzuiIcons } from '../../shared/components/azui/azui-icons/azui-icons.directive';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SalaComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule,
    AzuiButton,
    AzuiInputModule,
    AzuiIcons,
    HttpClientModule
  ]
})
export class SalaModule { }
