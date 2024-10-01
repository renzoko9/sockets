import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'azui-textarea-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azui-textarea.component.html',
  styleUrls: ['./azui-textarea.component.scss'],
})
export class AzuiTextareaComponent implements OnDestroy {
  @Input()
  label?: string;

  @ContentChild('azuitextarea')
  textarea?: ElementRef<HTMLTextAreaElement>;

  hasFocus = false;
  isDisabled = false;
  hasError = false;

  focusEvent = () => {
    this.hasFocus = true;
  };

  blurEvent = () => {
    this.hasFocus = false;
  };

  ngAfterContentInit(): void {
    if (!this.textarea) return;

    this.textarea.nativeElement.placeholder = ' ';
    this.textarea.nativeElement.addEventListener(
      'focus',
      this.focusEvent,
      false
    );
    this.textarea.nativeElement.addEventListener('blur', this.blurEvent, false);
  }

  ngOnDestroy(): void {
    this.textarea?.nativeElement.removeEventListener(
      'focus',
      this.focusEvent,
      false
    );
    this.textarea?.nativeElement.removeEventListener(
      'blur',
      this.blurEvent,
      false
    );
  }
}
