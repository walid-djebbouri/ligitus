/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu: NbMenuItem[] = [
      {
        title: 'Avokap Dashboard',
        icon: 'keypad-outline',
        link: '/pages/dashboard',
        home: true,
        children: undefined,
      },
      // {
      //   title: 'E-commerce',
      //   icon: 'shopping-cart-outline',
      //   link: '/pages/dashboard',
      //   home: true,
      //   children: undefined,
      // },
      // {
      //   title: 'IoT Dashboard',
      //   icon: 'home-outline',
      //   link: '/pages/iot-dashboard',
      //   children: undefined,
      // },
    ];



    const menu: NbMenuItem[] = [
        {
          title: 'Manage Entities',
          icon: 'edit-2-outline',
          group: true,
        },
        {
          title: 'Cabinet',
          link: '/pages/avokap/cabinet-smart-table',
          icon: 'walid',
        },
        {
          title: 'User',
          link: '/pages/avokap/user',
          icon: 'list-check-outline',

        },
        {
          title: 'Bundle | Customer Category',
          link: '/pages/avokap/bundles-cust-category',
          icon: 'walid',
        },
    ];
    return of([...dashboardMenu, ...menu]);
  }
}
