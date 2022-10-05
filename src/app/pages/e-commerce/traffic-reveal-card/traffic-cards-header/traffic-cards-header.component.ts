/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-cards-header',
  styleUrls: ['./traffic-cards-header.component.scss'],
  templateUrl: './traffic-cards-header.component.html',
})
export class TrafficCardsHeaderComponent implements OnDestroy {
  private alive = true;
  @Output() periodChange = new EventEmitter<string[]>();
  @Output() stateChange = new EventEmitter<string[]>();
  @Input() type: string = 'week';
  @Input() state: string = 'Total' ;
  types: string[] = ['week', 'month', 'year'];
  states: string[] = [ 'Total' , 'Oran', 'Alger', 'Blida', 'Constantine', 'ADRAR',  'CHLEF', 'LAGHOUAT'
    , 'OUM BOUAGHI', 'BATNA',  'BEJAIA', 'BISKRA',
    'BECHAR', 'BOUIRA', 'TAMANRASSET', 'TEBESSA', 'TLEMCEN', 'TIARET', 'TIZI OUZOU', 'DJELFA', 'JIJEL', 'SETIF',
    'SAIDA', 'SKIKDA', 'SIDI BEL ABBES', 'ANNABA', 'GUELMA', 'MEDEA', 'MOSTAGANEM', 'M\'SILA', 'MASCARA', 'OUARGLA', 'EL BAYDH', 'ILLIZI', 'BORDJ BOU ARRERIDJ', 'BOUMERDES', 'EL TAREF',
    'TINDOUF', 'TISSEMSILT', 'EL OUED', 'KHENCHLA', 'SOUK AHRASS', 'TIPAZA', 'MILA', 'AÏN DEFLA', 'NÂAMA', 'AÏN TEMOUCHENT', 'GHARDAÏA', 'RELIZANE' ] ;
  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit([period , this.state]);
  }
  changeState(state: string): void {
    this.stateChange.emit([state , this.type]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
