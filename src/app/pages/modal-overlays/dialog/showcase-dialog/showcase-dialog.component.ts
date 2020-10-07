/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent {

  @Input() title: string;
  @Input() id: string;
  @Input() cabinet_ref: string ;
  @Input() join_date: string;
  @Input() legal_name: string;
  @Input() commercial_name: string;
  @Input() cabinet_short_desc: string;
  @Input() cabinet_long_desc: string;
  @Input() logo_pic: string;
  @Input() membership_status: string;
  @Input() domiciliation: string;
  @Input() email: string;
  @Input() tel: string[];
  @Input() fax: string;
  @Input() nif: string;
  @Input() rib: string;
  @Input() cabinet_predilection_domains: [] ;
  @Input() lawyers: [];
  disabled = true;
  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
  disable() {
    if (  this.disabled === false ) {
      this.disabled = true ;
    } else {
      this.disabled = false ;
    }
  }
}
