import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './LyseisModules/Dashboards/analytics/analytics.component';

// Pages

import {LoginBoxedComponent} from './LyseisModules/UserPages/login-boxed/login-boxed.component';

// Elements

import {StandardComponent} from './LyseisModules/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './LyseisModules/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './LyseisModules/Elements/cards/cards.component';
import {ListGroupsComponent} from './LyseisModules/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './LyseisModules/Elements/timeline/timeline.component';
import {IconsComponent} from './LyseisModules/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './LyseisModules/Components/accordions/accordions.component';
// import {TabsComponent} from './LyseisModules/Components/tabs/tabs.component';
import {CarouselComponent} from './LyseisModules/Components/carousel/carousel.component';
import {ModalsComponent} from './LyseisModules/Components/modals/modals.component';
import {ProgressBarComponent} from './LyseisModules/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './LyseisModules/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './LyseisModules/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {TablesMainComponent} from './LyseisModules/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './LyseisModules/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './LyseisModules/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './LyseisModules/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './LyseisModules/Charts/chartjs/chartjs.component';
import { RoutesGuard } from './base/route.guard';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { DefaultDashboardComponent } from './LyseisModules/Dashboards/default-dashboard/default-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [RoutesGuard],
    children: [
      {path: '', component: DefaultDashboardComponent, data: {extraParameter: ''}},
      {path: 'inventories', loadChildren: () => import('./LyseisModules/inventories/inventories.module').then(m => m.InventoriesModule), data: {extraParameter: ''}}
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      {path: 'login', component: LoginBoxedComponent, data: {extraParameter: ''}}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule],
  providers: [RoutesGuard]
})
export class AppRoutingModule {
}
