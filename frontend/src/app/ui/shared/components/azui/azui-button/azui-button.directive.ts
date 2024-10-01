import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[azui-button]',
  standalone: true,
})
export class AzuiButton implements OnInit, OnChanges {
  @Input()
  tipo:
    | 'primary'
    | 'neutral'
    | 'third'
    | 'secondary'
    | 'outlined'
    | 'link'
    | 'text' = 'primary';

  @Input()
  contenido: 'texto' | 'icono' = 'texto';

  @Input()
  shadow: 'primary' | 'neutral' | 'none' = 'primary';

  @Input()
  shape: string = '';

  @Input()
  loading: boolean = false;

  @Input()
  danger: boolean = false;

  @Input()
  disabled: boolean = false;

  constructor(private readonly elementRef: ElementRef<HTMLButtonElement>) {}

  ngOnInit(): void {
    this.loadButtonStyles();
    this.loadingState(this.loading);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].firstChange) {
      this.loadButtonStyles();
    }

    if (
      changes['tipo'] &&
      changes['tipo'].currentValue &&
      !changes['tipo'].firstChange
    ) {
      this.loadTipoStyles(changes['tipo'].currentValue);
    }

    if (changes['loading'] && !changes['loading'].firstChange) {
      this.loadingState(changes['loading'].currentValue);
    }
  }

  loadButtonStyles() {
    this.elementRef.nativeElement.classList.add(`az-button`);
    this.elementRef.nativeElement.classList.add(`az-button-${this.tipo}`);
    if (this.danger)
      this.elementRef.nativeElement.classList.add(
        `az-button-${this.tipo}__danger`
      );

    if (this.shape && this.shape.length > 0) {
      this.elementRef.nativeElement.classList.add(this.shape);
    }
    if (this.contenido === 'icono') {
      this.elementRef.nativeElement.classList.add('az-button-icon');
    } else {
      if (this.tipo !== 'link') {
        this.elementRef.nativeElement.classList.add('az-button-normal');
      } else {
        this.elementRef.nativeElement.classList.add('az-button-link');
      }
    }

    if (this.tipo !== 'link' && this.tipo !== 'text') {
      if (this.shadow === 'primary') {
        this.elementRef.nativeElement.classList.add('shadow-primary');
      } else if (this.shadow === 'neutral') {
        this.elementRef.nativeElement.classList.add('shadow-neutral');
      }
    }

    if (this.disabled) {
      this.elementRef.nativeElement.classList.toggle(`az-button--disabled`);
    }
  }

  loadTipoStyles(tipo: string) {
    // Se remueve todas las posibles clases
    const classes = ['az-button-primary', 'az-button-secondary'];
    classes.forEach((cls) => {
      this.elementRef.nativeElement.classList.remove(cls);
    });
    // Se agrega la nueva clase
    this.elementRef.nativeElement.classList.add(`az-button-${tipo}`);
  }

  loadingState(value: boolean) {
    const spanElement =
      this.elementRef.nativeElement.querySelector('span[azui-icons]');
    if (spanElement && value) {
      spanElement.setAttribute('name', 'cargando');
      spanElement.setAttribute('ng-reflect-name', 'cargando');
    }
  }
}
