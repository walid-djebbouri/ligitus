/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { ProfitBarAnimationChartData } from '../../interfaces/ecommerce/profit-bar-animation-chart';
import { ChartData } from '../../interfaces/common/chart';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';

@Injectable()
export class ProfitBarAnimationChartService extends ProfitBarAnimationChartData {

  private data: any;
  private lineData: any[] ;
  constructor(private userActivities: BundlesCustCategoryService) {
    super();
    this.data = {
      chartLabel: [],
      axisXLabels: [],
      linesData: [],
      legend: ['Active', 'Inactive'],
    };
    this.userActivities.getUserActivityDaily().subscribe(
        (userActivity: any[]) => {
          this.data.linesData = userActivity ;
    }) ;
  }

  getDataForFirstLine(): number[] {
    return this.createEmptyArray(100)
      .map((_, index) => {
        const oneFifth = index / 5;

        return (Math.sin(oneFifth) * (oneFifth - 10) + index / 6) * 5;
      });
  }

  getDataForSecondLine(): number[] {
    return this.createEmptyArray(100)
      .map((_, index) => {
        const oneFifth = index / 5;

        return (Math.cos(oneFifth) * (oneFifth - 10) + index / 6) * 5;
      });
  }

  createEmptyArray(nPoints: number) {
    return Array.from(Array(nPoints));
  }

  getChartData(): Observable<ChartData> {
    // this.lineData[0] , this.lineData[1] ;
    return observableOf(this.data);
  }
}
