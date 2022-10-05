/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChartData, ChartSummary } from '../../interfaces/common/chart';
import { OrdersProfitChartData } from '../../interfaces/ecommerce/orders-profit-chart';
import { OrdersChartService } from './orders-chart.service';
import { ProfitChartService } from './profit-chart.service';
import {BundlesCustCategoryService} from '../common/bundles-cust-category.service';

@Injectable()
export class OrdersProfitChartService extends OrdersProfitChartData {

  private summary = [
      {
      title: 'Total Memberships',
      value: 0 ,
    },
    {
      title: 'Last Month',
      value: 0,
    },
    {
      title: 'Last Week',
      value: 0,
    },
  ];

  constructor(private ordersChartService: OrdersChartService,
              private profitChartService: ProfitChartService ,
              private summaryData: BundlesCustCategoryService) {
    super();
    this.summaryData.getMembershipTotal().subscribe((membershipTotal) => {
      this.summary[0].value = membershipTotal[0] ;
      this.summary[1].value = membershipTotal[1] ;
      this.summary[2].value = membershipTotal[2] ;

    }) ;
  }

  getOrderProfitChartSummary(): Observable<ChartSummary[]> {
    return observableOf(this.summary);
  }

  getOrdersChartData(period: string): Observable<ChartData> {
    return this.ordersChartService.getOrdersChartData(period);
  }

  getProfitChartData(period: string): Observable<ChartData> {
    return this.profitChartService.getProfitChartData(period);
  }
}
