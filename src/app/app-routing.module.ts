import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecureGuard } from './secure.guard';

const routes: Routes = [
  {
    path:'*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [SecureGuard],
    loadChildren: () => import('./layout/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'products',
    canActivate: [SecureGuard],
    loadChildren: () => import('./lyseis_modules/inventories/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'third-party',
    loadChildren: () => import('./lyseis_modules/third-party/third-party.module').then( m => m.ThirdPartyPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./lyseis_modules/documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'control-panel',
    loadChildren: () => import('./lyseis_modules/admin/control-panel/control-panel.module').then( m => m.ControlPanelPageModule)
  },
  {
    path: 'inventories',
    loadChildren: () => import('./lyseis_modules/inventories/inventories.module').then( m => m.InventoriesPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
