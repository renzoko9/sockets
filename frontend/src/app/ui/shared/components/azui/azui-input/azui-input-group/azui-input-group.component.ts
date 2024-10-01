import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { AzuiInputDirective } from '../azui-input.directive';

@Component({
  selector: 'azui-input-group',
  templateUrl: './azui-input-group.component.html',
  styleUrls: ['./azui-input-group.component.scss'],
})
export class AzuiInputGroupComponent implements OnInit, OnDestroy {
  @Input()
  prefixRef?: TemplateRef<any>;

  @Input()
  suffixRef?: TemplateRef<any>;

  @Input()
  estaEnFiltros = false;

  @Input()
  label?: string;

  @Input()
  azStyle: any;

  @ContentChild(AzuiInputDirective)
  input?: AzuiInputDirective;
  
  @Input()
  isDisabled = false;

  left!: string;
  hasFocus = false;
  observer?: MutationObserver;

  hasError = false;

  focusEvent = () => {
    this.hasFocus = true;
  };

  blurEvent = () => {
    this.hasFocus = false;
  };

  ngOnInit(): void {
    const leftPx = 16 + (this.prefixRef ? 30 : 0);
    this.left = leftPx + 'px';
  }

  ngAfterContentInit(): void {
    if (!this.input) return;

    this.input.elementRef.nativeElement.addEventListener(
      'focus',
      this.focusEvent,
      false
    );
    this.input.elementRef.nativeElement.addEventListener(
      'blur',
      this.blurEvent,
      false
    );
    this.observer = new MutationObserver((list) => {
      for (const record of list) {
        if (record && record.attributeName === 'disabled' && record.target) {
          this.isDisabled = (record.target as any)['disabled'] ?? false;
        }
      }
    });
    this.observer.observe(this.input.elementRef.nativeElement, {
      attributes: true,
      childList: false,
      subtree: false,
    });
    if (this.label) this.input.elementRef.nativeElement.placeholder = ' ';
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.input?.elementRef.nativeElement.removeEventListener(
      'focus',
      this.focusEvent,
      false
    );
    this.input?.elementRef.nativeElement.removeEventListener(
      'blur',
      this.blurEvent,
      false
    );
  }
}
