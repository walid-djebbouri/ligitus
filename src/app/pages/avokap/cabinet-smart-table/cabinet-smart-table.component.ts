/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, Input, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import {NbDialogService} from '@nebular/theme';
import {Router} from '@angular/router';
import {CreateCabinetComponent} from '../create-cabinet/create-cabinet.component';
import {DeleteCabinetComponent} from '../delete-cabinet/delete-cabinet.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './cabinet-smart-table.component.html',
  styleUrls: ['./cabinet-smart-table.component.scss'] ,
})
export class SmartTableCabinetComponent implements OnInit {
  loading_cabinets: boolean = true;
  donne = [];
  number_of_cabinet: number;
  settings = {
    mode: 'external',
   add: {
      addButtonContent: '<i class="nb-search"></i>',
   },
    delete: {
      deleteButtonContent: '<i class="ion-ios-eye-outline"></i>',
      confirmDelete: true,
    },
    edit: {
      editButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
        CabinetRef: {
        title: 'Cabinet Ref',
        type: 'string',
        width: '20%',
        },
      legalName: {
        title: 'Legal Name',
        type: 'string',
        width: '30%',
      },
      comName: {
        title: 'Commercial Name',
        type: 'string',
        width: '30%',
      },
      numLawyer: {
        title: 'Lawyers',
        type: 'string',
        width: '10%',
      },
      wilaya: {
        title: 'Wilaya',
        type: 'string',
        width: '10%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router , private dialogService: NbDialogService  , private service: SmartTableData) {
    const data = this.service.getData().then((cabinet: any[]) => {
      this.loading_cabinets = false;
      this.source.load(cabinet);
    }).catch((error) => {
    });
  }
  ngOnInit(): void {
  }
  onDeleteConfir(event): void {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.service.delete_cabinet(event.newData.id).then(() => {
      }).catch((error) => {
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  /*oneditConfirm(event): void {
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
  }*/

  creat_cabinet(event) {
    this.dialogService.open(CreateCabinetComponent, {
      context: {
        title: 'Create Cabinet ',
      },
    });

  }
  cabinetDetails(event): void {
    this.router.navigate(['/pages/avokap/cabinet-details/' + event.data.id]);
  }
  delete_cabinet(event): void {
    this.dialogService.open(DeleteCabinetComponent , {
      context : {
        IdCabinet : event.data.id,
        Cabinet_Ref : event.data.CabinetRef ,
        Commercial_nme : event.data.comName,
        Legal_Name : event.data.legalName,
      },
    });
  }
  nb_cabinets(event) {
     this.number_of_cabinet = this.source.count();

  }

}
