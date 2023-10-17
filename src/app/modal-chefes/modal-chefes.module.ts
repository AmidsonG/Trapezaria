import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChefesPageRoutingModule } from './modal-chefes-routing.module';

import { ModalChefesPage } from './modal-chefes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChefesPageRoutingModule
  ],
  declarations: [ModalChefesPage]
})
export class ModalChefesPageModule {}
