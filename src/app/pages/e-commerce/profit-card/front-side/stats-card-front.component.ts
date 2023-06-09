/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { ProfitBarAnimationChartData } from '../../../../@core/interfaces/ecommerce/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import { ChartData } from '../../../../@core/interfaces/common/chart';
import {BundlesCustCategoryService} from '../../../../@core/mock/common/bundles-cust-category.service';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent implements OnDestroy {

  private alive = true;

  chartData: any;

  constructor(private profitBarAnimationChartService: ProfitBarAnimationChartData ,
              private userActivities: BundlesCustCategoryService) {
  /*  this.profitBarAnimationChartService.getChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((chartData) => {
        this.chartData = chartData;
      });*/
    this.userActivities.getUserActivityDaily().subscribe((userActivity: any[]) => {
      const chartData = {
        chartLabel: [],
        axisXLabels: [],
        axisYLabels: [] ,
        linesData: [],
        legend: ['Active', 'Inactive'],
      } ;
      chartData.linesData = userActivity ;
      this.chartData  = chartData ;
    }) ;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
