import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AzuiInputGroupComponent } from '../azui-input/azui-input-group/azui-input-group.component';

@Component({
  selector: 'azui-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './azui-error.component.html',
  styleUrls: ['./azui-error.component.scss'],
})
export class AzuiErrorComponent implements OnChanges {
  @Input()
  errorMessage?: string;

  @Input()
  isDisabled = false;

  @ContentChild(AzuiInputGroupComponent)
  azuiInput?: AzuiInputGroupComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.handleAzuiInput();
  }

  ngAfterContentInit(): void {
    this.handleAzuiInput();
  }

  private handleAzuiInput() {
    if (this.azuiInput) {
      this.azuiInput.hasError =
        this.errorMessage !== null &&
        this.errorMessage !== undefined &&
        this.errorMessage !== '';
    }
  }
}
