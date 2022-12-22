/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule,
    NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
// import { FsIconComponent } from './tree-grid/tree-grid.component';
import {MeasureConverterPipe} from '../../@theme/pipes';
import { CabinetDetailsComponent } from './cabinet-details/cabinet-details.component';
import { UpdateCabinetComponent } from './update-cabinet/update-cabinet.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateCabinetComponent } from './create-cabinet/create-cabinet.component';
import { LawyerDetailsComponent } from './lawyer-details/lawyer-details.component';
import { UpdateLawyerComponent } from './update-lawyer/update-lawyer.component';
import { CreateLawyerComponent } from './create-lawyer/create-lawyer.component';
import { DeleteLawyerComponent } from './delete-lawyer/delete-lawyer.component';
import { BundlesCustCategoryComponent } from './bundles-cust-category/bundles-cust-category.component';
import {BundlesCustCategoryService} from '../../@core/mock/common/bundles-cust-category.service';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { DeleteCustomerCategoryComponent } from './delete-customer-category/delete-customer-category.component';
import { UpdateCustomerCategoryComponent } from './update-customer-category/update-customer-category.component';
import { CreateBundleComponent } from './create-bundle/create-bundle.component';
import { UpdateBundleComponent } from './update-bundle/update-bundle.component';
import { DeleteBundleComponent } from './delete-bundle/delete-bundle.component';
import { MembershipStatusComponent } from './membership-status/membership-status.component';
import {MembershipStatusService} from '../../@core/mock/common/membership-status.service';
import { CreateMembershipComponent } from './create-membership/create-membership.component';
import { DeleteMembershipComponent } from './delete-membership/delete-membership.component';
import { UpdateMembershipComponent } from './update-membership/update-membership.component';
import { UserComponent } from './user/user.component';
import {UserService} from '../../@core/mock/common/user.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeleteCabinetComponent } from './delete-cabinet/delete-cabinet.component';
import { ChangeCabinetComponent } from './change-cabinet/change-cabinet.component';
import {ValidationService} from '../../@core/mock/common/validation.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { BarPageComponent } from './bar-page/bar-page.component';
import { NewBarPageComponent } from './new-bar-page/new-bar-page.component';

@NgModule({
    imports: [
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        TablesRoutingModule,
        Ng2SmartTableModule,
        FormsModule,
        NbAccordionModule,
        NbButtonModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbTabsetModule,
        NbSpinnerModule,
        NbTooltipModule,
    ],
  declarations: [
    ...routedComponents,
    CabinetDetailsComponent,
    UpdateCabinetComponent,
    CreateCabinetComponent,
    LawyerDetailsComponent,
    UpdateLawyerComponent,
    CreateLawyerComponent,
    DeleteLawyerComponent,
    BundlesCustCategoryComponent,
    CreateCategoryComponent,
    DeleteCustomerCategoryComponent,
    UpdateCustomerCategoryComponent,
    CreateBundleComponent,
    UpdateBundleComponent,
    DeleteBundleComponent,
    MembershipStatusComponent,
    CreateMembershipComponent,
    DeleteMembershipComponent,
    UpdateMembershipComponent,
    UserComponent,
    ResetPasswordComponent,
    DeleteCabinetComponent,
    ChangeCabinetComponent,
    DeleteUserComponent,
    CreateUserComponent,
    ChangeStatusComponent,
    BarPageComponent,
    NewBarPageComponent,
    // FsIconComponent,
  ],
  providers: [
      MeasureConverterPipe,
      BundlesCustCategoryService,
      MembershipStatusService,
      UserService,
      ValidationService,
  ],
})
export class TablesModule { }
