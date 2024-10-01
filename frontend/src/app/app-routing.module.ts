import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/inicio/inicio.component').then(
        (m) => m.InicioComponent
      ),
  },
  {
    path: ':room',
    loadChildren: () =>
      import('./ui/pages/sala/sala.module').then((m) => m.SalaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
