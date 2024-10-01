import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AzuiRadioComponent } from './azui-radio/azui-radio.component';

@Component({
  selector: 'azui-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azui-radio-group.component.html',
  styleUrls: ['./azui-radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzuiRadioGroupComponent),
      multi: true,
    },
  ],
})
export class AzuiRadioGroupComponent implements ControlValueAccessor {
  @ContentChildren(AzuiRadioComponent, { descendants: true })
  opciones?: QueryList<AzuiRadioComponent>;

  @Input()
  valorSeleccionado?: number | string;

  @Output()
  valorSeleccionadoChange = new EventEmitter<number | string>();

  isDisabled: boolean = false;

  onChangeCb?: (value: any) => void;
  onTouchCb?: (value: any) => void;

  seleccionar(value: string | number): void {
    this.opciones
      ?.toArray()
      .filter((e) => e.value !== value && e.estaSeleccionado)
      .forEach((e) => (e.estaSeleccionado = false));

    const element = this.opciones?.toArray().find((e) => e.value === value);

    if (!element) return;

    this.valorSeleccionado = element.value;
    this.onChangeCb?.(this.valorSeleccionado);
    this.valorSeleccionadoChange.emit(this.valorSeleccionado);
  }

  ngAfterContentInit(): void {
    this.opciones?.toArray().forEach((e) => (e.isDisabled = this.isDisabled));

    if (
      this.valorSeleccionado === null ||
      this.valorSeleccionado === undefined ||
      !this.opciones
    ) {
      return;
    }

    const element = this.opciones
      ?.toArray()
      .find((e) => e.value === this.valorSeleccionado);

    if (!element) return;

    element.estaSeleccionado = true;
  }

  writeValue(obj: any): void {
    this.valorSeleccionado = obj;
    this.onChangeCb?.(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.opciones?.toArray().forEach((e) => (e.isDisabled = this.isDisabled));
  }
}
