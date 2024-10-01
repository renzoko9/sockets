import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss'],
})
export class SalaComponent implements OnInit {
  public room: string;
  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.room = '';
  }

  ngOnInit(): void {
    this.room = this.router.snapshot.params['room'];
    this.cookieService.set('room', this.room);
  }
}
