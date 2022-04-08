import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesGuard } from '../base/routes.gurad';

const routes: Routes = [
  {
    path: 'common',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('../modules/lyseis-common/lyseis-common.module').then(m => m.LyseisCommonModule)}
    ]
  },
  {path: '', component: LayoutComponent}
];

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, LayoutComponent],
  exports: [HeaderComponent, SideBarComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
