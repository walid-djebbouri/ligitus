/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/interfaces/ecommerce/country-order';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Country Orders Statistics</nb-card-header>
      <nb-card-body [nbSpinner]="!countriesCategories">
        <ngx-country-orders-map (select)="selectCountryById($event)"
                                [countryId]="'16'">
        </ngx-country-orders-map>
        <ngx-country-orders-chart *ngIf="countriesCategories"
                                  [countryName]="countryName"
                                  [data]="countryData"
                                  [labels]="countriesCategories"
                                  maxValue="10">
        </ngx-country-orders-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnInit, OnDestroy {

  private alive = true;
  @Output() stateNameEvent = new EventEmitter();

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private countryOrderService: CountryOrderData) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
  }

  ngOnInit(): void {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(event: any) {
    this.countryName = event.name;
    this.stateNameEvent.emit(event.name);
    this.countryOrderService.getCountriesCategoriesData(event.name)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData: number[]) => {
        this.countryData = countryData;
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
