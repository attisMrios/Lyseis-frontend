import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyPage } from './third-party.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdPartyRoutingModule {}
