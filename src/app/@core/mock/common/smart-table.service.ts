/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { SmartTableData } from '../../interfaces/common/smart-table';
import {rejects} from 'assert';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SmartTableService extends SmartTableData {
    data =  [];
    i: number ;
  constructor(private  http: HttpClient) {
    super();
  }
  getData() {
      return  new Promise((resolve, reject) => {
          this.http.get('http://api.avokap.com/cabinet').subscribe(
              (cabinet: any[]) => {
                  this.data = [] ;
                  for ( this.i = 0 ; this.i < cabinet.length ; this.i++) {
                      this.data.push({'CabinetRef': cabinet[this.i].cabinet_ref  ,
                          'legalName': cabinet[this.i].legal_name  ,
                          'comName': cabinet[this.i].commercial_name  ,
                          'membershipStatus': cabinet[this.i].membership_status  ,
                          'numLawyer': '0' ,
                          'id': cabinet[this.i].id,
                      }) ;
                  }
                  resolve(this.data);
              },
              (error) => {
                  reject(error);
              },
          ) ;
      }) ;
  }
  up_date_cabinet(donne: any[]): Promise<any> {
      return new Promise((resolve, reject) => {
          this.http.patch(
              'http://api.avokap.com/cabinet/5f43d02a6437e35174b3e31b',
              {
                  'cabinet_ref': donne['CabinetRef'],
                  'legal_name': donne['legalName'],
                  'commercial_name': donne['comName'],
                  'membership_status': donne['membershipStatus'] })
              .subscribe(
                  () => {
                      resolve();
                  },
                  (error) => {
                      reject(error);
                  });
      });
  }

  totale_up_date_cabinet(donne: any[], id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.patch(
                'http://api.avokap.com/cabinet/' + id,
                {
                    'cabinet_ref': donne['cabinet_ref'],
                    'legal_name': donne['legal_name'],
                    'commercial_name': donne['commercial_name'],
                    'membership_status': donne['membership_status'],
                    'cabinet_short_desc': donne['cabinet_short_desc'],
                    'cabinet_long_desc': donne['cabinet_long_desc'],
                    'domiciliation': donne['domiciliation'],
                    'email': donne['email'],
                    'fax': donne['fax'],
                    'nif': donne['nif'] ,
                    'rib': donne['rib'] ,
                    })
                .subscribe(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }


    cabinet_details(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(
                'http://api.avokap.com/cabinet?filter={"where":{"id":"' + id + '"},"include":[{"relation":"lawyers", "scope": {"include":[{"relation":"user"}]}}]}'  )
                .subscribe(
                    (cabinet: any[]) => {
                        resolve(cabinet);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }
    delet_cabinet(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(
                'http://api.avokap.com/cabinet?filter={"where":{"id":""}}'  )
                .subscribe(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }
    create_cabinet(donne: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(
                'http://api.avokap.com/cabinet',
                {
                    'cabinet_ref': donne['cabinet_ref'],
                    'legal_name': donne['legal_name'],
                    'commercial_name': donne['commercial_name'],
                    'membership_status': donne['membership_status'],
                    'cabinet_short_desc': donne['cabinet_short_desc'],
                    'cabinet_long_desc': donne['cabinet_long_desc'],
                    'domiciliation': donne['domiciliation'],
                    'email': donne['email'],
                    'fax': donne['fax'],
                    'nif': donne['nif'],
                    'rib': donne['rib'],
                    'tel': donne['tel'],
                    'cabinet_predilection_domains': donne['cabinet_predilection_domains']})
                .subscribe(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    });
        });
  }
}
