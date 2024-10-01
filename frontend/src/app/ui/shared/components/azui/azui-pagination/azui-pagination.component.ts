import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AzuiIcons } from '../azui-icons/azui-icons.directive';
import { AzuiSelectModule } from '../azui-select/azui-select.module';

interface TipoPaginacionItem {
  valor: number;
  esNumero: boolean;
}

@Component({
  selector: 'azui-pagination',
  standalone: true,
  imports: [CommonModule, AzuiIcons, AzuiSelectModule],
  templateUrl: './azui-pagination.component.html',
  styleUrls: ['./azui-pagination.component.scss'],
})
export class AzuiPaginationComponent implements OnInit {
  @Input()
  pagina = 1;

  @Input()
  itemsPorPagina = 12;

  @Input()
  total = 0;

  @Input()
  modulo?: string;

  @Input()
  etiquetaSelect?: string;

  @Output()
  cambioPagina = new EventEmitter<number>();

  @Output()
  cambioTamanioPagina = new EventEmitter<number>();

  iInicio!: number;
  iFin!: number;
  numeroDePaginas = 5;

  seleccionables: TipoPaginacionItem[] = [];

  ngOnInit(): void {
    this.iInicio = (this.pagina - 1) * this.itemsPorPagina + 1;
    this.iFin = this.pagina * this.itemsPorPagina;
    if (this.iFin > this.total) this.iFin = this.total;

    this.numeroDePaginas = Math.trunc(this.total / this.itemsPorPagina);

    if (this.numeroDePaginas !== this.total / this.itemsPorPagina)
      this.numeroDePaginas++;

    if (this.numeroDePaginas <= 5) {
      this.seleccionables = Array.from<any, TipoPaginacionItem>(
        { length: this.numeroDePaginas },
        (_, i) => ({
          esNumero: true,
          valor: i + 1,
        })
      );
    } else {
      this.seleccionables = this.getSeleccionables();
    }
  }

  getSeleccionables(): TipoPaginacionItem[] {
    if (this.numeroDePaginas === 6) {
      return Array.from<any, TipoPaginacionItem>({ length: 6 }, (_, i) => ({
        esNumero: true,
        valor: i + 1,
      }));
    }

    const page = this.pagina;

    if (this.numeroDePaginas === 7) {
      if (page !== 5 && this.pagina !== 6) {
        return [
          {
            esNumero: true,
            valor: 1,
          },
          {
            esNumero: true,
            valor: 2,
          },
          {
            esNumero: true,
            valor: 3,
          },
          {
            esNumero: true,
            valor: 4,
          },
          {
            esNumero: false,
            valor: 1,
          },
          {
            esNumero: true,
            valor: 7,
          },
        ];
      }

      if (page === 5 || page === 6) {
        return [
          {
            esNumero: true,
            valor: 1,
          },
          {
            esNumero: false,
            valor: -1,
          },
          {
            esNumero: true,
            valor: 4,
          },
          {
            esNumero: true,
            valor: 5,
          },
          {
            esNumero: true,
            valor: 6,
          },
          {
            esNumero: true,
            valor: 7,
          },
        ];
      }
    }

    if (this.numeroDePaginas === 8) {
      return [
        {
          esNumero: true,
          valor: 1,
        },
        {
          esNumero: false,
          valor: -1,
        },
        {
          esNumero: true,
          valor: 2,
        },
        {
          esNumero: true,
          valor: 3,
        },
        {
          esNumero: true,
          valor: 4,
        },
        {
          esNumero: false,
          valor: 1,
        },
        {
          esNumero: true,
          valor: 6,
        },
      ];
    }

    if (this.pagina <= 4) {
      return [
        ...Array.from<any, TipoPaginacionItem>({ length: 4 }, (_, i) => ({
          esNumero: true,
          valor: i + 1,
        })),
        {
          esNumero: false,
          valor: 1,
        },
        {
          esNumero: true,
          valor: this.numeroDePaginas,
        },
      ];
    }

    if (this.pagina >= this.numeroDePaginas - 3) {
      return [
        {
          esNumero: true,
          valor: 1,
        },
        {
          esNumero: false,
          valor: -1,
        },
        ...Array.from<any, TipoPaginacionItem>({ length: 4 }, (_, i) => ({
          esNumero: true,
          valor: this.numeroDePaginas - i,
        })).reverse(),
      ];
    }

    return [
      {
        esNumero: true,
        valor: 1,
      },
      {
        esNumero: false,
        valor: -1,
      },
      {
        esNumero: true,
        valor: this.pagina - 1,
      },
      {
        esNumero: true,
        valor: this.pagina,
      },
      {
        esNumero: true,
        valor: this.pagina + 1,
      },
      {
        esNumero: false,
        valor: 1,
      },
      {
        esNumero: true,
        valor: this.numeroDePaginas,
      },
    ];
  }

  gestionarSeleccionable(seleccionable: TipoPaginacionItem) {
    if (!seleccionable.esNumero) {
      if (seleccionable.valor > 0) {
        this.cambioPagina.emit(
          this.seleccionables[this.seleccionables.length === 6 ? 3 : 4].valor +
            1
        );
        return;
      }

      if (seleccionable.valor < 0) {
        this.cambioPagina.emit(this.seleccionables[2].valor - 1);
        return;
      }
    }

    if (seleccionable.valor !== this.pagina)
      this.cambioPagina.emit(seleccionable.valor);
  }

  avanzarPagina(valor: number): void {
    if (valor > 0) {
      if (this.pagina + valor > this.numeroDePaginas) return;

      this.cambioPagina.emit(this.pagina + 1);
      return;
    }

    if (this.pagina + valor < 1) return;

    this.cambioPagina.emit(this.pagina - 1);
  }
}
