import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonPage } from './common.page';

const routes: Routes = [
  {
    path: '',
    component: CommonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonPageRoutingModule {}
