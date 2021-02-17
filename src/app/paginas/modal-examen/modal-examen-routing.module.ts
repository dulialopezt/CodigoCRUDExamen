import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalExamenPage } from './modal-examen.page';

const routes: Routes = [
  {
    path: '',
    component: ModalExamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalExamenPageRoutingModule {}
