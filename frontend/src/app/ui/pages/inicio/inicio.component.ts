import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiButton } from '../../shared/components/azui/azui-button/azui-button.directive';
import { AzuiInputModule } from '../../shared/components/azui/azui-input/azui-input.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, AzuiButton, AzuiInputModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  public idSala: string = 'sala-1647';
}
