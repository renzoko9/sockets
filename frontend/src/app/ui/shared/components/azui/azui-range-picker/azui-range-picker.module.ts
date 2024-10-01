import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiRangePickerComponent } from './azui-range-picker.component';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AzuiButton } from '../azui-button/azui-button.directive';
import { AzuiDividerComponent } from '../azui-divider/azui-divider.component';
import { AzuiInputModule } from '../azui-input/azui-input.module';
import { AzuiCalendarComponent } from './azui-calendar/azui-calendar.component';

@NgModule({
  declarations: [
    AzuiRangePickerComponent,
    AzuiCalendarComponent
  ],
  imports: [
    CommonModule,
    AzuiIcons,
    AzuiButton,
    AzuiInputModule,
    AzuiDividerComponent,
    NzCollapseModule,
  ],
  exports: [
    AzuiRangePickerComponent
  ]
})
export class AzuiRangePickerModule { }
