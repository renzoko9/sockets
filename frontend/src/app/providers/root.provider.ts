import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

export interface IMensaje {
  tipoRespuesta: number;
  mensaje: string;
  usuario: string;
  pauseOnHover?: boolean;
  duracion?: number;
}

export interface IPuntos {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class RootProvider {
  private $mensajes = new Subject<IMensaje>();
  private $trazo = new Subject<IPuntos>();

  public mostrarMensaje(data: IMensaje): void {
    this.$mensajes.next(data);
  }

  public escucharMensajes(): Observable<IMensaje> {
    return this.$mensajes.asObservable();
  }

  public mostrarTrazo(posicion: IPuntos): void {
    this.$trazo.next(posicion);
  }

  public escucharTrazo(): Observable<IPuntos> {
    return this.$trazo.asObservable();
  }
}
