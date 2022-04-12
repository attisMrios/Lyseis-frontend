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

      {path: '', component: DefaultDashboardComponent, data: {extraParameter: 'dashboard'}},
      {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},
      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},
      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},
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
