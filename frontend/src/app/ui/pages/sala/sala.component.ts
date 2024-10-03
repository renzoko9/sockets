import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss'],
})
export class SalaComponent implements OnInit, OnDestroy {
  public room: string;
  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private socketWebService: SocketWebService
  ) {
    this.room = this.router.snapshot.params['room'];
    this.cookieService.set('room', this.room);
    socketWebService.connect();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.socketWebService.disconnect();
  }
}
