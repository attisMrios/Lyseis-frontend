import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyPage } from './third-party.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyPage
  },
  {
    path: 'third-party-capture',
    loadChildren: () => import('./third-party-capture/third-party-capture.module').then( m => m.ThirdPartyCapturePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdPartyPageRoutingModule {}
