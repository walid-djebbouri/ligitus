/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import {NbAccordionModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
// import { FsIconComponent } from './tree-grid/tree-grid.component';
import {MeasureConverterPipe} from '../../@theme/pipes';
import { CabinetDetailsComponent } from './cabinet-details/cabinet-details.component';
import { UpdateCabinetComponent } from './update-cabinet/update-cabinet.component';
import {FormsModule} from "@angular/forms";
import { CreateCabinetComponent } from './create-cabinet/create-cabinet.component';
import { LawyerDetailsComponent } from './lawyer-details/lawyer-details.component';

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
    ],
  declarations: [
    ...routedComponents,
    CabinetDetailsComponent,
    UpdateCabinetComponent,
    CreateCabinetComponent,
    LawyerDetailsComponent,
    // FsIconComponent,
  ],
  providers: [
    MeasureConverterPipe,
  ],
})
export class TablesModule { }
