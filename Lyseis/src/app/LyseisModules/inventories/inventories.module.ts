import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { DxDataGridModule } from 'devextreme-angular';

const routes: Routes = [
  {path: '', component: ProductsComponent}
];


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    DxDataGridModule
  ]
})
export class InventoriesModule { }
