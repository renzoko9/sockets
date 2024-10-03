import { Component, OnInit } from '@angular/core';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constants';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'conectados',
  templateUrl: './conectados.component.html',
  styleUrls: ['./conectados.component.scss'],
})
export class ConectadosComponent implements OnInit {
  public usuariosConectados: string[] = [];
  constructor(private socketService: SocketWebService) {}

  ngOnInit(): void {
    this.usuariosConectados.push(sessionStorage.getItem('user')!);
    this.socketService
      .listen<string>(ENDPOINTS.notificaciones.socket.usuarios)
      .subscribe((res) => {
        this.usuariosConectados.push(res);
      });
  }
}
