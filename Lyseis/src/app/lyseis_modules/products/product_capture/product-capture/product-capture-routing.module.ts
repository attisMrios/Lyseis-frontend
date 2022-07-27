import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCapturePage } from './product-capture.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCapturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCapturePageRoutingModule {}
