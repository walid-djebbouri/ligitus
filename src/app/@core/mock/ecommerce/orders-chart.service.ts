/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { PeriodsService } from '../common/periods.service';
import { ChartData } from '../../interfaces/common/chart';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class OrdersChartService {

  private year = [
      '2017',
    '2018',
  ];

  data: Observable<any>;
  afterInt = false ;
  constructor(private period: PeriodsService ,
              private membership_data: BundlesCustCategoryService) {
    this.data = this.dataObservable() ;
    this.afterInt = true ;
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }
  /******************** *************************************/
  private getDataForWeek(): Observable<any>     {
    const week = of({
      chartLabel: '',
      axisXLabels: this.getDataLabels(42, this.period.getWeeks()),
      legend: ['New Memberships' ,
               'Membership renewal' ,
               'Membership Upgrade' ,
               'Membership downgrade' ,
               'Drop-offs' ] ,
      linesData: [
        [
          184, 267, 326, 366, 389, 399,
          392, 371, 340, 304, 265, 227,
          191, 158, 130, 108, 95, 91, 97,
          109, 125, 144, 166, 189, 212,
          236, 259, 280, 300, 316, 329,
          338, 342, 339, 329, 312, 288,
          258, 221, 178, 128, 71,
        ],
        [
          158, 178, 193, 205, 212, 213,
          204, 190, 180, 173, 168, 164,
          162, 160, 159, 158, 159, 166,
          179, 195, 215, 236, 257, 276,
          292, 301, 304, 303, 300, 293,
          284, 273, 262, 251, 241, 234,
          232, 232, 232, 232, 232, 232,
        ],
        [
          58, 137, 202, 251, 288, 312,
          323, 324, 311, 288, 257, 222,
          187, 154, 124, 100, 81, 68, 61,
          58, 61, 69, 80, 96, 115, 137,
          161, 186, 210, 233, 254, 271,
          284, 293, 297, 297, 297, 297,
          297, 297, 297, 297, 297,
        ],
        [
          161, 186, 210, 233, 254, 271,
          297, 297, 297, 297, 297,
          323, 324, 311, 288, 257, 222,
          187, 154, 124, 100, 81, 68, 61,
          58, 137, 202, 251, 288, 312,
          284, 293, 297, 297, 297, 297,
          58, 61, 69, 80, 96, 115, 137,
        ],
        [
          58, 61, 69, 80, 96, 115, 137,
          284, 293, 297, 297, 297, 297,
          58, 137, 202, 251, 288, 312,
          161, 186, 210, 233, 254, 271,
          323, 324, 311, 288, 257, 222,
          323, 324, 311, 288, 257, 222,
          297, 297, 297, 297, 297,
        ],
      ],
    });
    return week ;
  }
  private getDataForMonth(): Observable<any>     {
    const ChartDataForMonth = {
      chartLabel: '',
      axisXLabels: this.period.getMonths(),
      legend: ['New Memberships' ,
               'Membership renewal' ,
               'Membership Upgrade' ,
               'Membership downgrade' ,
               'Drop-offs' ],
      linesData: [],
    } ;
    this.membership_data.getMemebershipForMonth().subscribe((Membership) => {
      ChartDataForMonth.linesData = Membership ;
    });
    const month = of(ChartDataForMonth);
    return month;
  }
  private getDataForYear(): Observable<any>     {
    const year = {
      chartLabel: '',
      axisXLabels: this.getDataLabels(3, this.period.getYears()),
      legend: ['New Memberships' ,
        'Membership renewal' ,
        'Membership Upgrade' ,
        'Membership downgrade' ,
        'Drop-offs' ],
      linesData: [],
    };
    this.membership_data.getMembershipForYear().subscribe(
        (Membership) => {
          year.linesData = Membership ;
        }) ;
    return  of(year)  ;
  }
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
  getOrdersChartData(period: string): Observable<ChartData>  {
    return  this.data.pipe( map (data =>   data[period] ) ) ;
  }
}
