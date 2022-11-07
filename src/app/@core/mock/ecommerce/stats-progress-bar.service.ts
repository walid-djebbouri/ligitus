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
      title: 'National Target',
      value: null,
      activeProgress: 0,
      description: 'National Registered / Nation Objective',
    },
    {
      title: null ,
      value: null,
      activeProgress: 0 ,
      description: 'Regional Registered / Regional Objective',
    },
  ];

  getProgressInfoData(stateName: string): Observable<ProgressInfo[]> {
    this.progressData.getTotalTargetForRegion().subscribe(
        (Algeria: any[]) => {
          this.progressInfoData[0].value = Algeria[0].value;
          this.progressInfoData[0].activeProgress = Algeria[0].value;
          this.progressInfoData[1].title = 'Target For ' + stateName ;
          this.progressInfoData[1].value = 0 ;
          this.progressInfoData[1].activeProgress = 0;
          Algeria.find(state => {
            if (state.state === stateName ) {
              this.progressInfoData[1].value =  Number( (100 * state.registered / state.objective).toFixed(2))  ;
              this.progressInfoData[1].activeProgress = Number( (100 * state.registered / state.objective).toFixed(2)) ;
            }
          }) ;
        }) ;
    return observableOf(this.progressInfoData);
  }
}
