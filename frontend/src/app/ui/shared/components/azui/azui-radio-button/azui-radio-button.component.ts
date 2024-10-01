import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';

export interface AzuiRadioButonValor {
  iconoIzquierda?: string;
  valor: number | string;
  label: string;
  iconoDerecha?: string;
}

@Component({
  selector: 'azui-radio-button',
  standalone: true,
  imports: [CommonModule, AzuiIcons],
  templateUrl: './azui-radio-button.component.html',
  styleUrls: ['./azui-radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzuiRadioButtonComponent),
      multi: true,
    },
  ],
})
export class AzuiRadioButtonComponent implements ControlValueAccessor {
  @Input()
  valores?: AzuiRadioButonValor[] = [];

  @Input()
  valorSeleccionado?: AzuiRadioButonValor;

  @Output()
  valorSeleccionadoChange = new EventEmitter<AzuiRadioButonValor>();

  isDisabled = false;

  seleccionar(valor: AzuiRadioButonValor) {
    this.valorSeleccionado = valor;
    this.valorSeleccionadoChange.emit(this.valorSeleccionado);
    this.onChangeCb?.(this.valorSeleccionado.valor);
  }

  writeValue(value: any): void {
    this.valorSeleccionado = this.valores?.find((e) => e.valor === value);
    this.valorSeleccionadoChange.emit(this.valorSeleccionado);
    this.onChangeCb?.(this.valorSeleccionado?.valor);
  }

  onChangeCb?: (value: any) => void;
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  onTouchCb?: (value: any) => void;
  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
