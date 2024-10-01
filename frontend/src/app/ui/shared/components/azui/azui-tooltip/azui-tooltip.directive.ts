import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[azui-tooltip]',
  standalone: true,
})
export class AzuiTooltip {
  @Input('azui-tooltip')
  content!: string | TemplateRef<any>;

  @Input()
  position: 'top' | 'left' | 'bottom' | 'right' = 'top';

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private vcr: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (typeof this.content === 'string' || this.content instanceof TemplateRef)
      this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    const tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(tooltipElement, 'azui-tooltip');
    this.renderer.addClass(tooltipElement, this.position);

    if (typeof this.content === 'string') {
      const text = this.renderer.createText(this.content);
      this.renderer.appendChild(tooltipElement, text);
    } else if (this.content instanceof TemplateRef) {
      const view = this.vcr.createEmbeddedView(this.content);
      view.detectChanges();
      if (view.rootNodes.length == 1) {
        const domEl = view.rootNodes[0] as HTMLElement;
        this.renderer.appendChild(tooltipElement, domEl);
      } else {
        view.rootNodes.forEach((e: HTMLElement) =>
          this.renderer.appendChild(tooltipElement, e)
        );
      }
    }

    this.renderer.appendChild(this.el.nativeElement, tooltipElement);
    this.setPosition(tooltipElement);

    this.renderer.addClass(tooltipElement, 'show');
  }

  private hideTooltip() {
    const tooltipElement = this.el.nativeElement.querySelector('.azui-tooltip');
    if (tooltipElement) {
      this.renderer.removeClass(tooltipElement, 'show');
      this.renderer.removeChild(this.el.nativeElement, tooltipElement);
    }
  }

  private setPosition(tooltipElement: HTMLElement) {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = tooltipElement.getBoundingClientRect();

    let top: number, left: number;

    switch (this.position) {
      case 'top':
        top = hostPos.top - tooltipPos.height + window.scrollY - 12;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + window.scrollY + 12;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'left':
        top =
          hostPos.top +
          (hostPos.height - tooltipPos.height) / 2 +
          window.scrollY;
        left = hostPos.left - tooltipPos.width - 12;
        break;
      case 'right':
        top =
          hostPos.top +
          (hostPos.height - tooltipPos.height) / 2 +
          window.scrollY;
        left = hostPos.right + 12;
        break;
      default:
        top = hostPos.top - tooltipPos.height + window.scrollY - 12;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    this.renderer.setStyle(tooltipElement, 'top', `${top}px`);
    ['left', 'right'].includes(this.position) &&
      this.renderer.setStyle(tooltipElement, 'left', `${left}px`);
  }
}
