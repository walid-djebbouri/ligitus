/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { LiveUpdateChart, PieChart, EarningData } from '../../interfaces/ecommerce/earning';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';

@Injectable()
export class EarningService extends EarningData {
  private currentDate: Date = new Date();
  private currentValue = Math.random() * 1000;
  private ONE_DAY = 24 * 3600 * 1000;
  private index: number = 0;
  constructor(private dataPieChart: BundlesCustCategoryService) {
    super();
    this.dataPieChart.getBundlesProportions().subscribe(
        (bundlesProportion: any[]) => {
          const total =  bundlesProportion[0] +  bundlesProportion[1] +  bundlesProportion[2] ;
          this.pieChartData[2].value = Number((100 * bundlesProportion[0] / total).toFixed(2))  ;
          this.pieChartData[1].value = Number((100 * bundlesProportion[1] / total).toFixed(2))  ;
          this.pieChartData[0].value = Number((100 * bundlesProportion[2] / total).toFixed(2))  ;

        });
    this.dataPieChart.getActivityUserRealTime().subscribe((userActivity) => {});
  }
  private pieChartData = [
    {
      value: 0,
      name: 'Avokap Premium',
    },
    {
      value: 0,
      name: 'Avokap Classic',
    },
    {
      value: 0,
      name: 'Avokap Basic',
    },
  ];

  private liveUpdateChartData = {
    bitcoin: {
      liveChart: [],
      delta: {
        up: true,
        value: 4,
      },
      dailyIncome: null ,
    },
    tether: {
      liveChart: [],
      delta: {
        up: false,
        value: 9,
      },
      dailyIncome: 5862,
    },
    ethereum: {
      liveChart: [],
      delta: {
        up: false,
        value: 21,
      },
      dailyIncome: 584,
    },
  };
  getDefaultLiveChartData(elementsNumber: number) {
    this.currentDate = new Date();
    return Array.from(Array(elementsNumber))
      .map(item => this.generateRandomLiveChartData(0));
  }

  generateRandomLiveChartData(v: number) {
    this.currentDate = new Date(+this.currentDate + this.ONE_DAY);
    return {
      value: [
        [
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate(),
        ].join('/'),
          v ,
      ],
    };
  }

  getEarningLiveUpdateCardData(currency, Data: number[]): Observable<any[]> {
    if  ( this.index ===  150) { this.index = 0 ; }
    const data = this.liveUpdateChartData[currency.toLowerCase()];
    const newValue = this.generateRandomLiveChartData(Data[this.index] + 1);
    data.liveChart.shift();
    data.liveChart.push(newValue);
    this.index++;
    return observableOf(data.liveChart);
  }

  getEarningCardData(currency: string): Observable<LiveUpdateChart> {
    const data = this.liveUpdateChartData[currency.toLowerCase()];

    data.liveChart = this.getDefaultLiveChartData(150);

    return observableOf(data);
  }

  getEarningPieChartData(): Observable<PieChart[]> {
    return observableOf(this.pieChartData);
  }
}
