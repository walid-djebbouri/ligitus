/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../../interfaces/ecommerce/stats-progress-bar';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  constructor(private progressData: BundlesCustCategoryService ) {
    super();
  }
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'National Total',
      value: null,
      activeProgress: 0,
      description: 'Description',
    },
    {
      title: null ,
      value: null,
      activeProgress: 0 ,
      description: 'Description',
    },
  ];

  getProgressInfoData(stateName: string): Observable<ProgressInfo[]> {
    this.progressData.getTotalTaregetForRegion().subscribe(
        (Algeria: any[]) => {
          this.progressInfoData[0].value = Algeria[0].value ;
          this.progressInfoData[1].title = 'Total Target For ' + stateName ;
          this.progressInfoData[1].value = 0 ;
          this.progressInfoData[1].activeProgress = 0;
          Algeria.find(state => {
            if (state.state === stateName ) {
              this.progressInfoData[1].value = state.objective ;
              this.progressInfoData[1].activeProgress = Number( (100 * state.registred / state.objective).toFixed(2))  ;
              this.progressInfoData[0].activeProgress = Number( (100 * state.registred / Algeria[0].value).toFixed(2)) ;


            }
          }) ;
        }) ;
    return observableOf(this.progressInfoData);
  }
}
