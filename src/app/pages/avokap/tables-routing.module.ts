/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableCabinetComponent } from './cabinet-smart-table/cabinet-smart-table.component';
import { SmartTableProfileComponent } from './profile-smart-table/profile-smart-table.component';
import {SmartTableUserComponent } from './user-smart-table/user-smart-table.component';
import {CabinetDetailsComponent} from './cabinet-details/cabinet-details.component';
import {LawyerDetailsComponent} from './lawyer-details/lawyer-details.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'cabinet-smart-table',
      component: SmartTableCabinetComponent,
    },
    {
      path: 'profile-smart-table',
      component: SmartTableProfileComponent,
    },
    {
      path: 'profile-smart-table',
      component: SmartTableUserComponent,
    },
    {
      path: 'cabinet-details/:id',
      component: CabinetDetailsComponent,
    },
    {
      path: 'lawyer-details/:id',
      component: LawyerDetailsComponent,
    },
  ],
}];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableCabinetComponent,
  SmartTableProfileComponent,
  SmartTableUserComponent,
];
