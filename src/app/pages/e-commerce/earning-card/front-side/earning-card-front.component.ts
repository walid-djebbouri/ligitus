/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval , Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/interfaces/ecommerce/earning';
import {BundlesCustCategoryService} from '../../../../@core/mock/common/bundles-cust-category.service';

@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;
  @Input() selectedCurrency: string = 'Bitcoin';
  intervalSubscription: Subscription;
  currencies: string[] = ['Bitcoin', 'Tether', 'Ethereum'];
  currentTheme: string;
  earningLiveUpdateCardData: LiveUpdateChart;
  liveUpdateChartData: { value: [string, number] }[];
  data: number[] ;
  loading: boolean = true;
  constructor(private themeService: NbThemeService,
              private earningService: EarningData ,
              private earningData: BundlesCustCategoryService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
      this.earningData.getActivityUserRealTime().subscribe((userData) => {
          this.getEarningCardData(this.selectedCurrency);
          this.data = userData ;
          this.helloWord();
      }) ;
  }

  ngOnInit() {}
  helloWord(): void {
      let period: number = 1 ;
      interval(20000)
          .pipe(takeWhile(() => this.alive))
          .subscribe(() => {
              this.earningData.getActivityUserRealTime()
                  .subscribe((userData) => {
                      if ( period % 3 === 1) {
                          for (let i = 0; i < 100; i++) {
                              this.data[i] = userData[i + 50];
                          }
                       //   console.log(this.data  , period % 3);
                      }
                      if (period % 3 === 2 ) {
                          for ( let i = 0 ; i < 100 ; i++ ) {
                              this.data[ (i + 100) % 150] =  userData[i + 50]  ;
                          }
                          //   console.log(this.data , period % 3);
                      }
                      if (period % 3 === 0)  {
                          for (let i = 0; i < 100; i++) {
                              this.data[i + 50] = userData[i + 50]   ;
                          }
                      //    console.log(this.data  , period % 3);
                      }
                      period++ ;
                  });
          }) ;
  }
  changeCurrency(currency) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }
  }

  private getEarningCardData(currency) {
    this.earningService.getEarningCardData(currency)
        .pipe(takeWhile(() => this.alive))
        .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
          this.earningLiveUpdateCardData = earningLiveUpdateCardData;
          this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;
          this.startReceivingLiveData(currency);
        });
  }

  startReceivingLiveData(currency) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
        .pipe(
            takeWhile(() => this.alive),
            switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency , this.data)),
        )
        .subscribe((liveUpdateChartData: any[]) => {
          this.liveUpdateChartData = [...liveUpdateChartData];
          this.loading = false ;
        });
  }
  /*changeCurrency(currency) {
    if (this.selectedCurrency !== currency) {
      this.selectedCurrency = currency;

      this.getEarningCardData(this.selectedCurrency);
    }
  }

  private getEarningCardData(currency) {
    this.earningService.getEarningCardData(currency)
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningLiveUpdateCardData: LiveUpdateChart) => {
        this.earningLiveUpdateCardData = earningLiveUpdateCardData;
        this.liveUpdateChartData = earningLiveUpdateCardData.liveChart;

        this.startReceivingLiveData(currency);
      });
  }

  startReceivingLiveData(currency) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    this.intervalSubscription = interval(200)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.earningService.getEarningLiveUpdateCardData(currency , this.data)),
      )
      .subscribe((liveUpdateChartData: any[]) => {
        this.liveUpdateChartData = [...liveUpdateChartData];
      });
  }*/

  ngOnDestroy() {
    this.alive = false;
  }
}
