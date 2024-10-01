import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TiposDeTag } from 'src/app/core/types/tipos-de-tag.type';
import { TagSize } from '../../../../../core/types/tag-size.type';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';

@Component({
  selector: 'azui-tag',
  standalone: true,
  imports: [CommonModule, AzuiIcons],
  templateUrl: './azui-tag.component.html',
  styleUrls: ['./azui-tag.component.scss'],
})
export class AzuiTagComponent {
  @Input()
  tipo: TiposDeTag = 'default';

  @Input()
  icono?: string;

  @Input()
  nombre!: string;

  @Input()
  size?: TagSize = 'default';
}
