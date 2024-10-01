import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'azui-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azui-divider.component.html',
  styleUrls: ['./azui-divider.component.scss'],
})
export class AzuiDividerComponent {
  @Input()
  tipo: 'horizontal' | 'vertical' = 'horizontal';
}
