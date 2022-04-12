import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

// BOOTSTRAP COMPONENTS

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ChartsModule} from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// LAYOUT

import {AnalyticsComponent} from './LyseisModules/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './LyseisModules/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './LyseisModules/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './LyseisModules/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './LyseisModules/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './LyseisModules/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './LyseisModules/Elements/cards/cards.component';
import {ListGroupsComponent} from './LyseisModules/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './LyseisModules/Elements/timeline/timeline.component';
import {IconsComponent} from './LyseisModules/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './LyseisModules/Components/accordions/accordions.component';
import {TabsComponent} from './LyseisModules/Components/tabs/tabs.component';
import {CarouselComponent} from './LyseisModules/Components/carousel/carousel.component';
import {ModalsComponent} from './LyseisModules/Components/modals/modals.component';
import {ProgressBarComponent} from './LyseisModules/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './LyseisModules/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './LyseisModules/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {RegularComponent} from './LyseisModules/Tables/regular/regular.component';
import {TablesMainComponent} from './LyseisModules/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './LyseisModules/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './LyseisModules/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './LyseisModules/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './LyseisModules/Charts/chartjs/chartjs.component';

// Chart.js Examples

import {LineChartComponent} from './LyseisModules/Charts/chartjs/examples/line-chart/line-chart.component';
import {BarChartComponent} from './LyseisModules/Charts/chartjs/examples/bar-chart/bar-chart.component';
import {ScatterChartComponent} from './LyseisModules/Charts/chartjs/examples/scatter-chart/scatter-chart.component';
import {RadarChartComponent} from './LyseisModules/Charts/chartjs/examples/radar-chart/radar-chart.component';
import {PolarAreaChartComponent} from './LyseisModules/Charts/chartjs/examples/polar-area-chart/polar-area-chart.component';
import {BubbleChartComponent} from './LyseisModules/Charts/chartjs/examples/bubble-chart/bubble-chart.component';
import {DynamicChartComponent} from './LyseisModules/Charts/chartjs/examples/dynamic-chart/dynamic-chart.component';
import {DoughnutChartComponent} from './LyseisModules/Charts/chartjs/examples/doughnut-chart/doughnut-chart.component';
import {PieChartComponent} from './LyseisModules/Charts/chartjs/examples/pie-chart/pie-chart.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { FooterComponent } from './layout/Components/footer/footer.component';
import { SearchBoxComponent } from './layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './layout/Components/header/elements/user-box/user-box.component';
import { HeaderComponent } from './layout/Components/header/header.component';
import { PageTitleComponent } from './layout/Components/page-title/page-title.component';
import { LogoComponent } from './layout/Components/sidebar/elements/logo/logo.component';
import { SidebarComponent } from './layout/Components/sidebar/sidebar.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { DefaultDashboardComponent } from './LyseisModules/Dashboards/default-dashboard/default-dashboard.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,

    // User Pages

    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    RegisterBoxedComponent,

    // Elements

    StandardComponent,
    IconsComponent,
    DropdownsComponent,
    CardsComponent,
    ListGroupsComponent,
    TimelineComponent,

    // Components

    AccordionsComponent,
    TabsComponent,
    CarouselComponent,
    ModalsComponent,
    ProgressBarComponent,
    PaginationComponent,
    TooltipsPopoversComponent,

    // Tables

    RegularComponent,
    TablesMainComponent,

    // Dashboard Boxes

    ChartBoxes3Component,

    // Form Elements

    ControlsComponent,
    LayoutComponent,

    // CHARTS

    ChartjsComponent,

    // Chart.js Examples

    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    DynamicChartComponent,
    BubbleChartComponent,
    ScatterChartComponent,
    DefaultDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


    // Charts

    ChartsModule,
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
