import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AzuiButton } from '../azui-button/azui-button.directive';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiTreeNodeComponent } from './azui-tree-node/azui-tree-node.component';
import { AzuiTreeComponent } from './azui-tree.component';

@NgModule({
  declarations: [AzuiTreeComponent, AzuiTreeNodeComponent],
  imports: [CommonModule, NzCollapseModule, AzuiIcons, AzuiButton],
  exports: [AzuiTreeComponent],
})
export class AzuiTreeModule {}
