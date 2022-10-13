/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'month';
  @Input() selectedTab: string;

  types: string[] = ['month', 'year'];
  chartLegendBundles: {iconColor: string; title: string}[];
  chartLegendMemberships: {iconColor: string; title: string}[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
    this.init();
  }

  init() {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        const orderProfitLegend = theme.variables.orderProfitLegend;

        this.currentTheme = theme.name;
        this.setLegendItemsBundle(orderProfitLegend);
        this.setLegendItemsMembership(orderProfitLegend);

      });

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  setLegendItemsBundle(orderProfitLegend) {
    this.chartLegendBundles = [
      {
        iconColor: orderProfitLegend.firstItem,
        title: 'AVOKAP PREMIUM',
      },
      {
        iconColor: orderProfitLegend.secondItem,
        title: 'AVOKAP CLASSIC',
      },
      {
        iconColor: orderProfitLegend.thirdItem,
        title: 'AVOKAP BASIC',
      },
    ];
  }
  setLegendItemsMembership(orderProfitLegend) {
    this.chartLegendMemberships = [
      {
        iconColor: '#61FF33',
        title: 'New ',
      },
      {
        iconColor: '#876521',
        title: 'Drop-offs',
      },
      {
        iconColor: orderProfitLegend.secondItem,
        title: 'Renewal',
      },
      {
        iconColor: '#f85aaa',
        title: 'Upgrade',
      },
      {
        iconColor: '#002193',
        title: 'Downgrade',
      },
    ];
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
