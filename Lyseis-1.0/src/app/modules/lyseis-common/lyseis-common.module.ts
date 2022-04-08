import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesGuard } from 'src/app/base/routes.gurad';

const routes: Routes = [
  {path: '', component: DashboardComponent, outlet: "main"}
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LyseisCommonModule { }
