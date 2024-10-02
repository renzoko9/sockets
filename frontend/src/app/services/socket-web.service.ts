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
    console.log("conectado")
    // this.listen();
  }

  private setupSocketEvents() {
    this.socket?.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // El servidor desconectó el socket manualmente
        this.socket?.connect(); // Reintentar conexión
      }
    });
  }

  // listen = () => {
  //   this.socket?.on('event', (res) => this.callback?.emit(res));
  // };

  public listen<T>(room: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket?.on(room, (res) => observer.next(res));
    });
  }

  public emitEventTrazo = (room: string, trazo: IPuntos) => {
    console.log(trazo)
    this.socket?.emit(room, trazo);
  };

  public emitEventMensajes = (room: string, mensaje: IMensaje) => {
    console.log(mensaje)
    this.socket?.emit(room, mensaje);
  };

  public disconnect() {
    this.socket?.disconnect();
  }
}
