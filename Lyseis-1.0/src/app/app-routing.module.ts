import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesGuard } from './base/routes.gurad';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RoutesGuard],
    component: LayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoutesGuard]
})
export class AppRoutingModule { }
