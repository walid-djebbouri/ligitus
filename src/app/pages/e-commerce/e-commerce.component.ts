/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, ViewChild} from '@angular/core';
import {ECommerceProgressSectionComponent} from './progress-section/progress-section.component';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  @ViewChild(ECommerceProgressSectionComponent) progressBar: ECommerceProgressSectionComponent ;
  getStateName(name: string): void {
    this.progressBar.upDateData(name);
  }
}
