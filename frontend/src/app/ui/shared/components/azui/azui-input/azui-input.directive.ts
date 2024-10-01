import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[azui-input]',
})
export class AzuiInputDirective implements OnInit {
  constructor(public readonly elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this.loadStyles();
  }

  private loadStyles() {
    this.elementRef.nativeElement.classList.add('az-input');
  }
}
