/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import {of as observableOf, Observable, of} from 'rxjs';
import { CountryOrderData } from '../../interfaces/ecommerce/country-order';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CountryOrderService extends CountryOrderData {

  private countriesCategories = [
    'Terminated',
    'On Hold',
    'Browse',
    'Active',
    'Total Registered',
  ];
  private stateData: any[] ;
  constructor(private status_data: BundlesCustCategoryService) {
    super();
    this.status_data.getStatusOfStat().subscribe(((statusOfStates: any[]) => {
      this.stateData = statusOfStates ;
    }));
  }

  private countriesCategoriesLength = this.countriesCategories.length;
  private generateRandomData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 20);
    });
  }

  getCountriesCategories(): Observable<string[]> {
    return observableOf(this.countriesCategories);
  }

  getCountriesCategoriesData(country: string): Observable<number[]> {
    let Data: number[] = [0 , 0 , 0 , 0 , 0]  ;
    this.stateData.find(State => {
      if (State.state ===  country) {
        Data = State.values ;
      }
    }) ;
    return  of(Data)   ;
  }
}
