import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalChefesPage } from './modal-chefes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChefesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalChefesPageRoutingModule {}
