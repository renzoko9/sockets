import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AzuiOptionComponent } from './azui-option/azui-option.component';

@Component({
  selector: 'azui-select',
  templateUrl: './azui-select.component.html',
  styleUrls: ['./azui-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzuiSelectComponent),
      multi: true,
    },
  ],
})
export class AzuiSelectComponent implements ControlValueAccessor {
  @ViewChild('select')
  select!: ElementRef<HTMLDivElement>;

  @Input()
  tieneOpciones = true;

  @Input()
  placement: string = 'bottom';

  @Input()
  placeholder?: string;

  @Input()
  setSize = false;

  @Input()
  icono?: string;

  @Input()
  azStyle: any;

  @Input()
  lugar: 'header-filtros' | 'body-filtros' | 'normal' = 'normal';

  @ContentChildren(AzuiOptionComponent, { descendants: true })
  opciones?: QueryList<AzuiOptionComponent>;

  @Input()
  valorSeleccionado?: number | string;

  @Output()
  valorSeleccionadoChange = new EventEmitter<number | string>();

  etiquetaSeleccionada?: string;

  popoverAbierto = false;

  isDisabled = false;

  width = 'max-content';

  seleccionar(id?: number | string) {
    this.popoverAbierto = false;

    this.opciones
      ?.toArray()
      .filter((e) => e.id !== id && e.estaSeleccionado)
      .forEach((e) => (e.estaSeleccionado = false));

    const element = this.opciones?.toArray().find((e) => e.id === id);

    if (!element) return;

    this.valorSeleccionado = element.id;
    this.onChangeCb?.(this.valorSeleccionado);
    this.valorSeleccionadoChange.emit(this.valorSeleccionado);
    this.etiquetaSeleccionada = element.label;
  }

  ngAfterViewInit(): void {
    if (this.setSize) {
      this.width = `${this.select.nativeElement.clientWidth - 32}px`;
    }
  }

  ngAfterContentInit(): void {
    if (
      this.valorSeleccionado === null ||
      this.valorSeleccionado === undefined ||
      !this.opciones
    ) {
      return;
    }

    const element = this.opciones
      ?.toArray()
      .find((e) => e.id === this.valorSeleccionado);

    if (!element) return;

    element.estaSeleccionado = true;
    this.etiquetaSeleccionada = element.label;
  }

  writeValue(value: any): void {
    this.valorSeleccionado = value;
    this.etiquetaSeleccionada = this.opciones
      ?.toArray()
      .find((e) => e.id === this.valorSeleccionado)?.label;
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
