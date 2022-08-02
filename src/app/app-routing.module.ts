import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecureGuard } from './secure.guard';

const routes: Routes = [
  {
    path:'*',
    redirectTo: 'folder/home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'folder/Home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    canActivate: [SecureGuard],
    loadChildren: () => import('./layout/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'products',
    canActivate: [SecureGuard],
    loadChildren: () => import('./lyseis_modules/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'third-party',
    loadChildren: () => import('./lyseis_modules/third-party/third-party.module').then( m => m.ThirdPartyPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
