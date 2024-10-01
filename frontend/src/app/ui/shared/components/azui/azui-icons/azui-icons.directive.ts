import { HttpClient } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Directive({
  selector: '[azui-icons]',
  standalone: true,
})
export class AzuiIcons implements OnInit, OnChanges {
  private static readonly cacheName = 'azui-icons-v1';
  private static mapIcons = new Map<string, any>();
  private static cache?: Cache;

  @Input()
  name!: string;

  constructor(
    private readonly elementRef: ElementRef<HTMLSpanElement>,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!AzuiIcons.cache) {
      caches
        .open(AzuiIcons.cacheName)
        .then((cache) => {
          AzuiIcons.cache = cache;
          this.loadIcon(this.name);
        })
        .catch((e) => this.cargarDeAsset(this.name));
    } else {
      this.loadIcon(this.name);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['name'] &&
      changes['name'].currentValue &&
      !changes['name'].firstChange
    ) {
      if (!AzuiIcons.cache) {
        caches
          .open(AzuiIcons.cacheName)
          .then((cache) => {
            AzuiIcons.cache = cache;
            this.loadIcon(changes['name'].currentValue);
          })
          .catch((e) => this.cargarDeAsset(changes['name'].currentValue));
      } else {
        this.loadIcon(changes['name'].currentValue);
      }
    }
  }

  private loadIcon(name: string): void {
    if (AzuiIcons.mapIcons.has(name)) {
      this.setIcon(name, AzuiIcons.mapIcons.get(name)!);
      return;
    }

    AzuiIcons.cache!.match(name)
      .then((res) => {
        if (!res) {
          this.cargarDeAsset(name);
        } else {
          res.text().then((contenido) => {
            this.setIcon(name, contenido);
          });
        }
      })
      .catch((e) => this.cargarDeAsset(name));
  }

  private cargarDeAsset(name: string) {
    firstValueFrom(
      this.http.get(`assets/azui-icons/${name}.svg`, { responseType: 'text' })
    )
      .then((response) => {
        this.setIcon(name, response);
      })
      .catch((e) => {});
  }

  private setIcon(name: string, response: string) {
    this.elementRef.nativeElement.style.display = 'inline-block';
    this.elementRef.nativeElement.style.lineHeight = '1';
    this.elementRef.nativeElement.style.height = '1em';
    this.elementRef.nativeElement.innerHTML = response;
    AzuiIcons.mapIcons.set(name, response);
    AzuiIcons.cache?.put(name, new Response(response));
  }
}
