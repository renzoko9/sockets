import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateUtil } from 'src/app/core/utils/date.util';

@Component({
  selector: 'azui-range-picker',
  templateUrl: './azui-range-picker.component.html',
  styleUrls: ['./azui-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzuiRangePickerComponent),
      multi: true,
    },
  ],
})
export class AzuiRangePickerComponent implements ControlValueAccessor {
  @Input()
  width?: string;

  seMuestraElCalendario = false;

  calendarioIzquierda = new Date();
  calendarioDerecha = new Date();

  fechaIzquierda?: Date;
  fechaDerecha?: Date;

  fechasSeleccionadas?: Date[];

  isDisabled = false;

  constructor() {
    this.calendarioDerecha.setMonth(this.calendarioDerecha.getMonth() + 1);
  }

  setFechaIzquierda(nuevaFecha: Date): void {
    this.fechaIzquierda = nuevaFecha;
    this.actualizarFechas();
  }

  setFechaDerecha(nuevaFecha: Date): void {
    this.fechaDerecha = nuevaFecha;
    this.actualizarFechas();
  }

  private actualizarFechas(): void {
    if (!this.fechaIzquierda || !this.fechaDerecha) return;

    this.writeValue([
      DateUtil.clone(this.fechaIzquierda),
      DateUtil.clone(this.fechaDerecha),
    ]);
    this.seMuestraElCalendario = false;
  }

  writeValue(value: any): void {
    this.fechasSeleccionadas = value;
    if (this.fechasSeleccionadas && this.fechasSeleccionadas.length === 2) {
      this.fechaIzquierda = DateUtil.clone(this.fechasSeleccionadas[0]);
      this.fechaDerecha = DateUtil.clone(this.fechasSeleccionadas[1]);
    }
    this.onChangeCb?.(value);
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
