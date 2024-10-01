import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';
import { FileUtil } from 'src/app/core/utils/file.util';
import { ReporteUtil } from 'src/app/core/utils/reporte.util';

@Component({
  selector: 'azui-file-upload',
  templateUrl: './azui-file-upload.component.html',
  styleUrls: ['./azui-file-upload.component.scss'],
})
export class AzuiFileUploadComponent implements OnInit {
  @Input()
  public titulo!: string;

  @Input()
  public mostrarError: boolean = false;

  @Input()
  public esModoLectura: boolean = false;

  @Input()
  public beforeUpload!: (file: NzUploadFile) => boolean;

  @Input()
  public deleteUpload!: () => void;

  @Input()
  public sustentos: NzUploadFile[] = [];

  @Output()
  public sustentosChange: EventEmitter<NzUploadFile[]>;

  @Input()
  public disabled: boolean = false;

  @Input()
  public esMultiple: boolean = false;

  @Input()
  public duracionAnimacion = 1200;

  @Input()
  public accept: string[] = ['.pdf'];

  @Input()
  public esNombreEditable: boolean = false;

  public filename?: string;
  public animacionArchivoSubido = false;
  public t: any;
  public RUTAS = ROUTES_URL;

  constructor(
    private readonly urlSerializer: UrlSerializer,
    private readonly location: Location,
    private readonly router: Router
  ) {
    this.sustentosChange = new EventEmitter();
  }

  ngOnInit(): void {
    if (this.sustentos.length > 0) {
      this.filename = this.sustentos[0].name;
    }
  }

  handleFiles(files: File[]) {
    if (files.length === 0) return;

    if (this.esMultiple) return;

    if (files.length > 1) {
      alert('Solo se puede subir un archivo');
      return;
    }

    const archivos = [...files].filter((e) => {
      if (e.name.indexOf('.') === -1) return false;

      return this.accept.includes(e.name.substring(e.name.lastIndexOf('.')));
    });

    if (archivos.length !== 1) {
      alert('Solo se puede subir un archivo');
      return;
    }

    this.sustentos = [];
    this.sustentos.push({
      uid: new Date().getTime().toString(),
      name: archivos[0].name,
      size: archivos[0].size,
      type: archivos[0].type,
      originFileObj: archivos[0],
    });
    this.animacionArchivoSubido = true;
    this.t = setTimeout(() => {
      this.animacionArchivoSubido = false;
      clearTimeout(this.t);
    }, this.duracionAnimacion);
    this.filename = this.sustentos[0].name;
    this.sustentosChange.emit(this.sustentos);
    this.beforeUpload(this.sustentos[0]);
  }

  eliminarSustento() {
    this.sustentos = [];
    this.sustentosChange.emit(this.sustentos);
    this.deleteUpload();
  }

  async descargarSustento() {
    const sustento = this.sustentos[0];

    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        sustento.uid
      )
    ) {
      const url = this.router.createUrlTree([
        ROUTES_URL.visualizarDocumento.base,
        Number(sustento.uid),
      ]);

      window.open(
        this.location.prepareExternalUrl(this.urlSerializer.serialize(url)),
        '_blank'
      );
      return;
    }

    const archivoResolucionEnBase64 = sustento.originFileObj
      ? await FileUtil.fileToBase64(sustento.originFileObj)
      : await FileUtil.fileToBase64(sustento);
    ReporteUtil.descargarReporte({
      contentType: 'application/pdf',
      file: FileUtil.convertBase64ToBlob(archivoResolucionEnBase64 as string),
      filename: `${sustento.name.substring(
        0,
        sustento.name.lastIndexOf('.')
      )}.pdf`,
    });
  }
}
