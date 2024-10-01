import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiTableComponent } from './azui-table.component';
import { AzuiTableHeadComponent } from './azui-table-head/azui-table-head.component';
import { AzuiTableBodyComponent } from './azui-table-body/azui-table-body.component';
import { AzuiTableRowComponent } from './azui-table-row/azui-table-row.component';
import { AzuiTableSkeletonComponent } from './azui-table-skeleton/azui-table-skeleton.component';
import { AzuiVacioComponent } from '../azui-vacio/azui-vacio.component';

@NgModule({
  declarations: [
    AzuiTableComponent,
    AzuiTableHeadComponent,
    AzuiTableBodyComponent,
    AzuiTableRowComponent,
    AzuiTableSkeletonComponent,
  ],
  imports: [CommonModule, AzuiVacioComponent],
  exports: [
    AzuiTableComponent,
    AzuiTableHeadComponent,
    AzuiTableBodyComponent,
    AzuiTableRowComponent,
    AzuiTableSkeletonComponent,
  ],
})
export class AzuiTableModule {}
