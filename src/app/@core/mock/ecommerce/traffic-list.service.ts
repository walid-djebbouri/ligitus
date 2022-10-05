/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import {of as observableOf, Observable, of} from 'rxjs';
import { PeriodsService } from '../common/periods.service';
import { TrafficListItem, TrafficListData } from '../../interfaces/ecommerce/traffic-list';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';
import {map} from 'rxjs/operators';

@Injectable()
export class TrafficListService extends TrafficListData {

  data: Observable<any>;
  userActivityRegionalWeek = [] ;
  userActivityRegionalMonth = [] ;
  userActivityRegionalYear = [] ;

  constructor(private period: PeriodsService ,
              private userHistorical: BundlesCustCategoryService) {
    super();
    this.data =  this.dataObservable() ;
    this.userHistorical.getMonthlyActivitiesOfStates()
        .subscribe((data) => { this.userActivityRegionalMonth = data ; }) ;
    this.userHistorical.getWeeklyActivitiesOfStates()
        .subscribe((data) => {this.userActivityRegionalWeek = data ; });
    this.userHistorical.getYearlyActivitiesOfStates()
        .subscribe((data) => {this.userActivityRegionalYear = data  ; } ) ;
  }

  private getDataWeek(dataOfWeek: number[]): TrafficListItem[] {
    const getFirstDateInPeriod = () => {
      const weeks = this.period.getWeeksForTraffic();
      return weeks[weeks.length - 1];
    };

    return this.reduceData(this.period.getWeeksForTraffic() , dataOfWeek);
  }

  private getDataMonth(dataOfMonth: number[]): TrafficListItem[] {
    const getFirstDateInPeriod = () => {
      const months = this.period.getMonthsForTraffic();
      return months[months.length - 1];
    };

    return this.reduceData(this.period.getMonthsForTraffic(), dataOfMonth);
  }

  private getDataYear(dataOfYear): TrafficListItem[] {
    const getFirstDateInPeriod = () => {
      const years = this.period.getYearsForTraffic();

      return `${parseInt(years[0], 10) - 1}`;
    };

    return this.reduceData(this.period.getYearsForTraffic() , dataOfYear);
  }

  private reduceData(timePeriods: string[], value: number[]): TrafficListItem[] {
    const max = Math.max(...value);
    return timePeriods.reduce((result, timePeriod, index) => {
    const hasResult = value[index - 1] ;
      const prevDate = timePeriods[(index + 1) % 12] ;
      const prevValue = value[index + 1] ;
      const deltaValue = Number((prevValue - value[index]).toFixed(3))     ;
      const item = {
        date: timePeriod,
        value: value[index],
        delta: {
          up: deltaValue <= 0,
          value: Math.abs(deltaValue),
        },
        comparison: {
          prevDate,
          prevValue : (prevValue / max) * 130 ,
          nextDate: timePeriod,
          nextValue: (value[index] / max) * 130 ,
        },
      };

      return [...result, item];
    }, []);
  }
  dataObservable(): Observable<any> {
    const data = {
      week: [],
      month: [],
      year: [],
    };
    this.userHistorical.getUserDailyHistorical().subscribe(
        (daily: number[]) => {data.week = this.getDataWeek(daily) ;   }) ;
    this.userHistorical.getUserMonthlyHistorical().subscribe(
        (monthly: number[]) => {data.month = this.getDataMonth(monthly) ;  }) ;
    this.userHistorical.getUserYearlyHistorical().subscribe(
        (yearly: number[]) => {data.year = this.getDataYear(yearly) ; }) ;
    return  of(data);
  }
    getTrafficListData(period: string): Observable<any> {
      return  this.data.pipe( map (
          (data) => {
            return  data[period] ;
          }   ) ) ;


    }
  getTrafficListDataForState(state: string , period: string): Observable<any> {
    const dataOfState = {
      week: [],
      month: [],
      year: [],
    };
    const  week: number[] = [0, 0, 0, 0, 0, 0, 0, 0] ;
    const  month: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ;
    const  year: number[] = [0, 0, 0, 0, 0, 0] ;
    this.userActivityRegionalWeek.filter( element => {
      if ( element.wilaya_name === state ) {
        week.push( parseFloat(element.activity_count ) ) ;
        week.shift();
      }
    } ) ;
    this.userActivityRegionalMonth.filter( element => {
      if ( element.wilaya_name === state ) {
         month.push( parseFloat(element.activity_count ) ) ;
         month.shift();
      }
    } ) ;
    this.userActivityRegionalYear.filter( element => {
      if ( element.wilaya_name === state ) {
        year.push( parseFloat(element.activity_count ) ) ;
      }
    } ) ;
    dataOfState.week = this.getDataWeek(week) ;
    dataOfState.month = this.getDataMonth(month) ;
    dataOfState.year = this.getDataYear(year) ;
    return  of(dataOfState[period]);
  }
}
