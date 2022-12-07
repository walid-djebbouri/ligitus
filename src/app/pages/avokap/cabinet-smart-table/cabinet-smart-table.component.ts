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
  selectedState: string = '*';
  clicked: boolean = false;
  page: number = 1;
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
      this.service.getCabinetByPage(1, this.selectedState).subscribe(
        (cabinets) => {
          this.loading_cabinets = false;
          this.source.load(cabinets);
        } ,
        (errors) => {} ) ;
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
  newPages(event) {
     this.number_of_cabinet = this.source.count();
    if ( ! this.clicked && this.lastPage(event)) {
      this.page++ ;
      this.service.getCabinetByPage(this.page, this.selectedState).subscribe(
          (cabinets) => {
            for ( let i = 0 ; i < cabinets.length ; i++) {
              this.source.add(cabinets[i]);
            }
            this.number_of_cabinet = this.source.count();

          } ,
          () => {} );
    } else {
      this.clicked = false ;
    }

  }

  selectedUser(): boolean {
    return   this.clicked = true;
  }
  lastPage(event): boolean {
    return event.source.data.length  / event.source.pagingConf.perPage
        === event.source.pagingConf.page ||
        Math.trunc(event.source.data.length  / event.source.pagingConf.perPage) + 1
        === event.source.pagingConf.page
        ;
  }

  changeState(event): void {
      this.page = 1 ;
      this.service.getCabinetByPage(this.page, this.selectedState).subscribe(
          (cabinets) => {
              this.source.load(cabinets);
              this.number_of_cabinet = this.source.count();

          } ,
          () => {} );
  }
}
