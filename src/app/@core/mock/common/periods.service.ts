/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    const currentYear = new Date().getFullYear() ;
    const previousYear = currentYear - 1 ;
    const nextYear = currentYear + 1 ;

    return [
      previousYear.toString() ,  currentYear.toString() , nextYear.toString() ,
    ];
  }

  getMonths() {
    return [
        '',
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ];
  }

  getWeeks() {
    return [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',

    ];
  }
  getMonthsForTraffic() {
    let j = new Date().getMonth();
    const year = [] ;
    const inverseYear = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ];
    for ( let i = 0 ; i < 12 ; i++ ) {
      if ( j < 0 ) {
        year.push( inverseYear[j + 12]) ;
      } else {
        year.push( inverseYear[j]) ;
      }
      j-- ;
    }
    return year ;
  }
  getWeeksForTraffic() {
    let j = new Date().getDay() - 1;
    const week = [] ;
    const inverseWeek = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    for ( let i = 0 ; i < 7 ; i++ ) {
      if ( j < 0 ) {
        week.push( inverseWeek[j + 7]) ;
      } else {
        week.push( inverseWeek[j]) ;
      }

      j-- ;
    }
    return week ;
  }
  getYearsForTraffic() {
    let year = new Date().getFullYear();
    const years = [] ;
    for ( let i = 0; i < 5; i++ ) {
      years.push( String(year) ) ;
      year-- ;
    }
    return years ;
  }
}
