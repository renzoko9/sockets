import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzuiButton } from '../../shared/components/azui/azui-button/azui-button.directive';
import { AzuiInputModule } from '../../shared/components/azui/azui-input/azui-input.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    AzuiButton,
    AzuiInputModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  public idSala: string = 'sala-1647';
  public nick: FormControl<string | null | undefined> = new FormControl(null);
  private socketWebService = inject(SocketWebService);
  private route = inject(Router);

  public ingresarSala() {
    sessionStorage.setItem('user', this.nick.value!);
    this.route.navigate([this.idSala]);
  }
}
