import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalExamenPageRoutingModule } from './modal-examen-routing.module';

import { ModalExamenPage } from './modal-examen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalExamenPageRoutingModule
  ],
  declarations: [ModalExamenPage]
})
export class ModalExamenPageModule {}
