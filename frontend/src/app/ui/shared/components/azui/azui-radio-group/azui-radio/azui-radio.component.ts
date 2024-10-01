import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiRadioGroupComponent } from '../azui-radio-group.component';

@Component({
  selector: 'azui-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azui-radio.component.html',
  styleUrls: ['./azui-radio.component.scss'],
})
export class AzuiRadioComponent {
  @Input()
  value!: string | number;

  @Input()
  label: string = '';

  @Input()
  descripcion?: string;

  @ViewChild('radioRef')
  radioRef!: ElementRef<HTMLInputElement>;

  estaSeleccionado: boolean = false;
  isDisabled: boolean = false;

  constructor(private readonly radioGroup: AzuiRadioGroupComponent) {}

  cambiarEstaSeleccionado(): void {
    this.estaSeleccionado = true;
    this.radioGroup.seleccionar(this.value);
  }
}
