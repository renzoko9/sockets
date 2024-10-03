import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

export interface IMensaje {
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

  public mostrarMensaje(data: IMensaje): void {
    this.$mensajes.next(data);
  }

  public escucharMensajes(): Observable<IMensaje> {
    return this.$mensajes.asObservable();
  }
}
