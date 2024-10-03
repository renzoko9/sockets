import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constants';
import { IMensaje } from 'src/app/providers/root.provider';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public mensaje: FormControl<string | null | undefined> = new FormControl('');
  public usuario: string = '';
  public mensajes: IMensaje[] = [];

  constructor(private socketWebService: SocketWebService) {
    this.socketWebService
      .listen<IMensaje>(ENDPOINTS.notificaciones.socket.mensaje)
      .subscribe((res) => {
        console.log(res);
        this.mensajes.push(res);
      });
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user')!;
  }

  enviarMensaje() {
    const mensajeEmit: IMensaje = {
      mensaje: this.mensaje.value!,
      usuario: this.usuario,
    };
    this.socketWebService.emitEvent('mensaje', mensajeEmit);
    this.mensajes.push(mensajeEmit)
    this.mensaje.patchValue('');
  }
}
