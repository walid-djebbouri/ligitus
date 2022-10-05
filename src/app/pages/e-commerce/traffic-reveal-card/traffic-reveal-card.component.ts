/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { TrafficListItem, TrafficListData } from '../../../@core/interfaces/ecommerce/traffic-list';
import { TrafficBar } from '../../../@core/interfaces/ecommerce/traffic-bar';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficBarData: TrafficBar;
  trafficListData: TrafficListItem[];
  revealed = false;
  period: string = 'week';

  constructor(private trafficListService: TrafficListData) {
    setTimeout(() => {
      this.getTrafficFrontCardData(this.period);

    } , 2000);
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string , state: string): void {
    this.period = value;
    if (state === 'Total') {
      this.getTrafficFrontCardData(value);
    } else {
      this.setStateAndGetData(state , value);
    }
  }
  setStateAndGetData(state: string , period: string): void {
    this.trafficListService.getTrafficListDataForState(state , period)
        .pipe(takeWhile(() => this.alive))
        .subscribe((trafficListData: TrafficListItem[]) => {
      this.trafficListData = trafficListData;
      this.trafficBarData = {
        data: trafficListData.map(item => item.value),
        labels: trafficListData.map(item => item.date),
        formatter: '{c0}',
      };
    });
    if (state === 'Total' ) {
      this.getTrafficFrontCardData(period);
    }
  }
  getTrafficFrontCardData(period: string) {
    this.trafficListService.getTrafficListData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((trafficListData: TrafficListItem[]) => {
        this.trafficListData = trafficListData;
        this.trafficBarData = {
          data: trafficListData.map(item => item.value),
          labels: trafficListData.map(item => item.date),
          formatter: '{c0}',
        };
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
