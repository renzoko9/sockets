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

@Component({
  selector: 'azui-toggle',
  standalone: true,
  imports: [CommonModule, AzuiIcons],
  templateUrl: './azui-toggle.component.html',
  styleUrls: ['./azui-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AzuiToggleComponent),
      multi: true,
    },
  ],
})
export class AzuiToggleComponent implements ControlValueAccessor {
  @Input()
  textoActivo: string = '';

  @Input()
  textoInactivo: string = '';

  @Input()
  iconoActivo: string = 'check';

  @Input()
  iconoInactivo: string = 'equis';

  /**
   * Por defecto es circular
   */
  @Input()
  shape: 'circular' | 'cuadrado' = 'circular';

  @Input()
  requiereConfirmacion = false;

  @Output()
  change = new EventEmitter<boolean>();

  @Input()
  isDisabled = false;
  
  @Input()
  estaActivo = true;

  toggleEstado() {
    if (this.isDisabled) return;
    if (this.requiereConfirmacion) {
      this.change.emit(!this.estaActivo);
      return;
    }
    this.estaActivo = !this.estaActivo;
    this.onChangeCb?.(this.estaActivo);
  }

  writeValue(value: boolean): void {
    this.estaActivo = value;
    this.onChangeCb?.(value);
  }

  onChangeCb?: (estaActivo: boolean) => void;
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  onTouchedCb?: () => void;
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
