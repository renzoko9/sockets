import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MensajeModal } from 'src/app/core/interfaces/mensaje-modal.interface';
import { AzuiButton } from '../azui-button/azui-button.directive';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiTagComponent } from '../azui-tag/azui-tag.component';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'azui-modal-message',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    AzuiButton,
    AzuiIcons,
    AzuiTagComponent,
    SpinnerComponent,
  ],
  templateUrl: './azui-modal-message.component.html',
  styleUrls: ['./azui-modal-message.component.scss'],
})
export class AzuiModalMessageComponent implements OnChanges {
  @ViewChild('helper')
  helper!: ElementRef<HTMLDivElement>;

  @Input()
  isVisible!: boolean;

  @Input()
  handleCancel!: (esSubmit: boolean) => void;

  @Input()
  mensajeModal?: MensajeModal;

  private t: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes['isVisible'] ||
      changes['isVisible'].firstChange ||
      !changes['isVisible'].currentValue
    )
      return;

    this.t = setTimeout(() => {
      this.aplicarEstiloModal();
      clearTimeout(this.t);
    });
  }

  handleOpen(): void {
    if (this.mensajeModal?.autoClose) {
      const timer = setTimeout(() => {
        this.handleCancel(false);
        clearTimeout(timer);
      }, 2000);
    }
  }

  private aplicarEstiloModal() {
    const e = this.helper.nativeElement.parentElement!.parentElement!;
    e.style.borderTop = 'none';
    e.style.padding = '40px 24px';
  }
}
