import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { io, Socket } from 'socket.io-client';
import { SERVICES } from 'src/environments/service';
import { IMensaje, IPuntos } from '../providers/root.provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketWebService {
  public socket?: Socket;
  public mensajes: IMensaje[] = [];
  public callbackTrazo: EventEmitter<any> = new EventEmitter();
  constructor(private cookieService: CookieService) {}

  public connect() {
    this.socket = io(SERVICES.notificaciones.url, {
      forceNew: true,
      query: {
        token: this.cookieService.get('room'),
      },
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.socket?.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // El servidor desconectó el socket manualmente
        this.socket?.connect(); // Reintentar conexión
      }
    });
  }

  public listen<T>(room: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket?.on(room, (res) => observer.next(res));
    });
  }

  public emitEvent = (event: string, mensaje: IMensaje | IPuntos | string) => {
    this.socket?.emit(event, mensaje);
  };

  public disconnect() {
    this.socket?.disconnect();
  }
}
