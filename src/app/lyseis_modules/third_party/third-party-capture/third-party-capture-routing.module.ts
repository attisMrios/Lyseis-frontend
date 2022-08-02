import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdPartyCapturePage } from './third-party-capture.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyCapturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdPartyCapturePageRoutingModule {}
