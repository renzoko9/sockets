import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENDPOINTS } from 'src/app/core/constants/endpoints.constants';
import { IPuntos } from 'src/app/providers/root.provider';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'pizarra',
  templateUrl: './pizarra.component.html',
  styleUrls: ['./pizarra.component.scss'],
})
export class PizarraComponent {
  @ViewChild('canvasRef', { static: false }) canvasRef!: ElementRef;

  public width: number = 713;
  public height: number = 600;

  private cx!: CanvasRenderingContext2D;

  private points: Array<any> = [];

  public isAvailabe: boolean = false;
  public room: string;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if (e.target.id === 'canvasId' && this.isAvailabe) {
      this.write(e);
    }
  };

  @HostListener('click', ['$event'])
  onClick = (e: any) => {
    if (e.target.id === 'canvasId') {
      this.isAvailabe = !this.isAvailabe;
    }
  };
  constructor(
    private socketWebService: SocketWebService,
    private router: ActivatedRoute
  ) {
    this.room = router.snapshot.params['room'];
    this.socketWebService
      .listen<IPuntos>(ENDPOINTS.notificaciones.socket.puntos)
      .subscribe((res) => {
        console.log(res);
        this.writeSingle(res, false);
      });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.render();
  }

  private render() {
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
  }
  private write(res: any) {
    const canvasEl = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top,
    };
    this.writeSingle(prevPos);
  }

  private writeSingle(prevPos: any, emit: boolean = true) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPost = this.points[this.points.length - 1];
      const currentPost = this.points[this.points.length - 2];

      this.drawOnCanvas(prevPost, currentPost);
      // Emitir al room
      if (emit) {
        this.socketWebService.emitEvent('puntos', prevPost);
      }
    }
  }

  private drawOnCanvas(prevPos: any, currentPost: any) {
    if (!this.cx) return;
    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPost.x, currentPost.y);
      this.cx.stroke();
    }
  }

  public clearZone = () => {
    this.points = [];
    this.cx.clearRect(0, 0, this.width, this.height);
    this.socketWebService.callbackTrazo.emit(this.points);
  };
}
