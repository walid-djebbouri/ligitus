/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, Input} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import {NbDialogService} from '@nebular/theme';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {Router} from '@angular/router';
import {UpdateCabinetComponent} from '../update-cabinet/update-cabinet.component';
import {CreateCabinetComponent} from '../create-cabinet/create-cabinet.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './cabinet-smart-table.component.html',
  styleUrls: ['./cabinet-smart-table.component.scss'] ,
})
export class SmartTableCabinetComponent {
  donne = [];

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true ,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true ,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
        CabinetRef: {
        title: 'Cabinet Ref',
        type: 'string',
      },
      legalName: {
        title: 'Legal Name',
        type: 'string',
      },
      comName: {
        title: 'Commercial Name',
        type: 'string',
      },
      membershipStatus: {
        title: 'Status',
        type: 'string',
      },
      numLawyer: {
        title: 'N° Lawyers',
        type: 'string',
      },
      id: {
        title: 'id',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router , private dialogService: NbDialogService  , private service: SmartTableData) {
    const data = this.service.getData().then((cabinet: any[]) => {
      this.source.load(cabinet);
    }).catch((error) => {
    });
  }

  onDeleteConfir(event): void {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.service.delet_cabinet(event.newData.id).then(() => {
      }).catch((error) => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  oneditConfirm(event): void {
    if (window.confirm('edit')) {
      this.donne['CabinetRef'] = event.newData.CabinetRef ;
      this.donne['legalName'] = event.newData.legalName ;
      this.donne['comName'] = event.newData.comName ;
      this.donne['membershipStatus'] = event.newData.membershipStatus ;
      this.service.up_date_cabinet(this.donne).then(() => {
      }) ;
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onUserRowSelect(event): void {
    this.router.navigate(['/pages/avokap/cabinet-details/' + event.data.id]);
  }

  creat_cabinet(event) {
    this.dialogService.open(CreateCabinetComponent, {
      context: {
        title: 'Create Cabinet ',
      },
    });

  }
}
