/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Injectable, OnInit} from '@angular/core';
import { PeriodsService } from '../common/periods.service';
import { ChartData } from '../../interfaces/common/chart';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';
import {observable, Observable, of as observableOf, of} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class ProfitChartService implements OnInit {

  private year = [
      '2020',
      '2021',
  ];

  data: Observable<any>;
  constructor(private period: PeriodsService ,
              private bundleCategory: BundlesCustCategoryService) {
    this.data = this.dataObservable() ;
  }
    ngOnInit() {}
    dataObservable(): Observable<any> {
     const data = {
      week  : null,
      month : null,
      year  : null,
    };
    this.getDataForWeek().subscribe((week) => {data.week = week ; });
    this.getDataForMonth().subscribe((month) => {data.month = month; });
    this.getDataForYear().subscribe((year) => {data.year = year; }) ;
    const observableData = of(data);
    return  observableData ;
  }
  private getDataForWeek(): Observable<any>     {
    const week = of({
      chartLabel: '',
      axisXLabels: this.period.getWeeks(),
      legend: ['AVOKAP BASIC', 'AVOKAP CLASSIC', 'AVOKAP PREMIUM'],
      linesData: [
        [10 , 10 , 10 , 10 , 10 , 10 , 10] ,
        [5 , 5 , 5 , 5 , 5 , 5 , 5 ] ,
        [2 , 2 , 2 , 2 , 2 , 2 , 2 ] ,
      ],
    });
    return week ;
   }
  private getDataForMonth(): Observable<any>     {
    const ChartDataForMonth = {
      chartLabel: '',
      axisXLabels: this.period.getMonths(),
      legend: ['AVOKAP BASIC', 'AVOKAP CLASSIC', 'AVOKAP PREMIUM'],
      linesData: [],
    } ;
    this.bundleCategory.getDataForMonth().subscribe((Avokap) => {
      ChartDataForMonth.linesData = [
        Avokap[0] ,
        Avokap[1] ,
        Avokap[2] ,
      ];
    });
    const month = of(ChartDataForMonth);
    return month;
  }
  private getDataForYear(): Observable<any>     {
    const ChartDataForYear = {
      chartLabel: '',
      axisXLabels: null,
      legend: ['AVOKAP BASIC', 'AVOKAP CLASSIC', 'AVOKAP PREMIUM'],
      linesData: [],
    } ;
    this.bundleCategory.getDataForYear().subscribe((Avokap) => {
      ChartDataForYear.linesData = [
        Avokap[0] ,
        Avokap[1] ,
        Avokap[2] ,
      ];
      ChartDataForYear.axisXLabels = Avokap[3];
    });
    const year = of(ChartDataForYear);
    return year;
  }
  getProfitChartData(period: string): Observable<ChartData>  {
    return  this.data.pipe( map (data =>   data[period] ) ) ;
  }
}
