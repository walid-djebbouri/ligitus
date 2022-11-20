/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { SmartTableData } from '../../interfaces/common/smart-table';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable()
export class SmartTableService extends SmartTableData {
    data = [];
    i: number;
    cabinet = [];
    Cabinets = [];

    constructor(private  http: HttpClient) {
        super();
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.apiUrl + 'cabinet').subscribe(
                (cabinet: any[]) => {
                    this.data = [];
                    for (this.i = 0; this.i < cabinet.length; this.i++) {
                        this.data.push({
                            'CabinetRef': cabinet[this.i].cabinet_ref,
                            'legalName': cabinet[this.i].legal_name,
                            'comName': cabinet[this.i].commercial_name,
                            'membershipStatus': cabinet[this.i].membership_status,
                            'numLawyer': cabinet[this.i].nb_lawyers ,
                            'id': cabinet[this.i].id,
                            'wilaya': cabinet[this.i].wilaya,
                        });
                    }
                    this.Cabinets = cabinet ;
                    resolve(this.data);
                },
                (error) => {
                    reject(error);
                },
            );
        });
    }

    totale_up_date_cabinet(donne: any[], id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.patch(
                environment.apiUrl + 'cabinet/' + id,
                {
                    cabinet_ref: donne['cabinet_ref'],
                    legal_name: donne['legal_name'],
                    commercial_name: donne['commercial_name'],
                    cabinet_short_desc: donne['cabinet_short_desc'],
                    cabinet_long_desc: donne['cabinet_long_desc'],
                    domiciliation: donne['domiciliation'],
                    email: donne['email'],
                    fax: donne['fax'],
                    nif: donne['nif'],
                    rib: donne['rib'],
                    join_date :  donne['join_date'],
                    tel: donne['tel'],
                    wilaya : donne['wilaya'],
                    wilaya_code: donne['wilaya_code'] ,
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
                environment.apiUrl + 'cabinet?filter={"where":{"id":"' + id + '"},"include":[{"relation":"lawyers", "scope": {"include":[{"relation":"user","scope": {"include":[{"relation":"userStatuses", "scope":{"order":["status_date  DESC"]}}] } } ] }}]}')
                .subscribe(
                    (cabinet: any[]) => {
                        this.cabinet = cabinet;
                        resolve(cabinet);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    delete_cabinet(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(
                environment.apiUrl + 'cabinets/' + id)
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
                environment.apiUrl + 'cabinet',
                {
                    wilaya_code: donne['wilaya_code'],
                    'wilaya': donne['wilaya'],
                    'join_date': donne['join_date'],
                    'cabinet_ref': donne['cabinet_ref'],
                    'legal_name': donne['legal_name'],
                    'commercial_name': donne['commercial_name'],
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

    create_lawyer(donne: any[]): Promise<any> {
        let category: string = null;
        let bar_name: string = null;
        let bar_role: string = null;
        let role_cabinet: string = null;
        if (donne['category_hist'][0]) {
            category = donne['category_hist'][0].category ;
        }
        if (donne['bar_role_hist'][0]) {
            bar_name = donne['bar_role_hist'][0].bar_name ;
            bar_role =  donne['bar_role_hist'][0].bar_role ;
        }
        if (donne['cabinet_role_hist'][0]) {
            role_cabinet = donne['cabinet_role_hist'][0].role ;
        }

        return new Promise((resolve, reject) => {
            this.http.post(
                environment.apiUrl + 'lawyer/' + donne['cabinetId'] + '/cabinet',
                {
                    'project_ref': ['avokap'],
                    'roles' : ['customer'],
                    'email': donne['email'],
                    'password': donne['password'],
                    'first_name': donne['first_name'],
                    'last_name': donne['last_name'],
                    'first_name_local': donne['first_name_local'],
                    'last_name_local': donne['last_name_local'],
                    'join_date': donne['join_date'],
                    'avokap_ref': donne['avokap_ref'],
                    'address': donne['address'],
                    'mobile': donne['mobile'],
                    'phone': donne['phone'],
                    'license_num': donne['license_num'],
                    'license_end_date': donne['license_end_date'],
                    'role_cabinet_hist' : donne['cabinet_role_hist'],
                    'short_desc': donne['short_desc'],
                    'long_desc': donne['long_desc'],
                    'special_discount': donne['special_discount'],
                    'predilection_domains': donne['lawyer_predilection_domains'],
                    'category_hist': donne['category_hist'],
                    'bar_role_hist': donne['bar_role_hist'],
                    'category': category,
                    'bar_name': bar_name,
                    'bar_role': bar_role,
                    'role_cabinet': role_cabinet,

                })
                .subscribe(
                    () => {
                        resolve();
                    },
                    (error:  HttpErrorResponse) => {
                        reject(error);
                    });
        });
    }
    deleteUserStatus(id: string): Observable<any> {
        return  this.http.delete(environment.apiUrl + '/user-statuses/' + id).pipe( map(deleted => deleted) );
    }
    up_date_lawyer(donne: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.patch(
                environment.apiUrl + 'profile/' + donne['userId'],
                {
                    // 'cabinet_ref': donne['cabinet_ref'],
                    // 'legal_name': donne['legal_name'],
                    // 'commercial_name': donne['commercial_name'],
                    // 'project_ref': donne['project_ref'],
                    'status': donne['status'],
                    'status_remark': donne['status_remark'],
                    'roles' : ['customer'],
                    'email': donne['email'],
                    'first_name': donne['first_name'],
                    'last_name': donne['last_name'],
                    'first_name_local': donne['first_name_local'],
                    'last_name_local': donne['last_name_local'],
                    // 'roles': donne['roles'],
                    // 'join_date': donne['join_date'],
                    'avokap_ref': donne['avokap_ref'],
                    'address': donne['address'],
                    'mobile': donne['mobile'],
                    'phone': donne['phone'],
                    'license_num': donne['license_num'],
                    'license_end_date': donne['license_end_date'],
                    'category': donne['category'],
                    'bar_name': donne['bar_name'],
                    'bar_role': donne['bar_role'],
                    'role_cabinet': donne['role_cabinet'],
                    //   'date_joined': donne['date_joined'],
                    'short_desc': donne['short_desc'],
                    'long_desc': donne['long_desc'],
                    //   'avg_rating': donne['avg_rating'],
                    //   'membership_status': donne['membership_status'],
                    //   'cabinetId': donne['cabinetId'] ,
                    //   'userId':   donne['userId'] ,
                    //   'custcatId': donne['custcatId'],
                    'special_discount': donne['special_discount'],
                    'predilection_domains': donne['lawyer_predilection_domains'],
                    'bar_role_hist' : donne['bar_role_hist'],
                    'category_hist' : donne['category_hist'],
                    'role_cabinet_hist' : donne['cabinet_role_hist'],
                })
                .subscribe(
                    () => {
                        this.cabinet_details(donne['cabinetId']).then(() => {
                            resolve();
                        });
                        },
                    (error) => {
                        reject(error);
                    });
        });
    }
    delete_lawyer(lawyerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(environment.apiUrl + 'profile/' + lawyerId + '/lawyer').subscribe(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                });
        });
    }
    get_cabinet_of_lawyer(id: string): Promise<any> {
        return new Promise( ((resolve, reject) => {
            this.http.get(environment.apiUrl + 'profile?filter={"where": {"id": "' + id + '"}, "include":[{"relation" : "lawyer", "scope":{"include":[{"relation" : "cabinet"}]}},{"relation" :"userStatuses","scope":{"fields":["id","status","status_date","status_remark","userId"],"order" : ["status_date  DESC"]}}]}').subscribe(
                (cabinet: any) => {
                    this.cabinet = [] ;
                    const lawyers = [] ;
                    let user ;
                    user = {    'project_ref': cabinet[0].project_ref ,
                               'email': cabinet[0].email,
                                'first_name': cabinet[0].first_name ,
                                'last_name': cabinet[0].last_name ,
                                'first_name_local': cabinet[0].first_name_local ,
                                'last_name_local': cabinet[0].last_name_local ,
                                'roles': cabinet[0].roles ,
                                'join_date': cabinet[0].join_date ,
                                userStatuses:  cabinet[0].userStatuses,

                    };
                    lawyers.push({
                        'id' : cabinet[0].lawyer.id,
                        'avokap_ref' : cabinet[0].lawyer.avokap_ref,
                        'address' : cabinet[0].lawyer.address,
                        'mobile' : cabinet[0].lawyer.mobile,
                        'phone' : cabinet[0].lawyer.phone,
                        'license_num' : cabinet[0].lawyer.license_num,
                        'license_end_date' : cabinet[0].lawyer.license_end_date,
                        'predilection_domains' : cabinet[0].lawyer.predilection_domains,
                        'category' : cabinet[0].lawyer.category,
                        'category_hist' : cabinet[0].lawyer.category_hist,
                        'bar_name' : cabinet[0].lawyer.bar_name,
                        'bar_role' : cabinet[0].lawyer.bar_role,
                        'bar_role_hist' : cabinet[0].lawyer.bar_role_hist,
                        'role_cabinet_hist' : cabinet[0].lawyer.role_cabinet_hist,
                        'role_cabinet' : cabinet[0].lawyer.role_cabinet,
                        'short_desc' : cabinet[0].lawyer.short_desc,
                        'long_desc' : cabinet[0].lawyer.long_desc,
                        'avg_rating' : cabinet[0].lawyer.avg_rating,
                        'special_discount' : cabinet[0].lawyer.special_discount,
                        'cabinetId' : cabinet[0].lawyer.cabinetId,
                        'userId' : cabinet[0].lawyer.userId,
                        'custcatId' : cabinet[0].lawyer.custcatId,
                          'user' : user,
                        })   ;
                    this.cabinet.push({'cabinet_ref' : cabinet[0].lawyer.cabinet.cabinet_ref ,
                                       'id':  cabinet[0].lawyer.cabinetId ,
                                       'legal_name' : cabinet[0].lawyer.cabinet.legal_name ,
                                       'commercial_name' : cabinet[0].lawyer.cabinet.commercial_name,
                                       'lawyers' :  lawyers});
                    resolve(cabinet);
                } ,
                (error) => {
                    reject(error);
                });
        }) ) ;
    }

    change_Cabinet(donne: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.patch(
                environment.apiUrl + 'profile/' + donne['userId'],
                {
                    'cabinetId': donne['cabinetId'],
                    'role_cabinet_hist': donne['role_cabinet_hist'],
                    'role_cabinet': donne['role_cabinet'],
                })
                .subscribe(
                    () => {
                        const statuse  = 'Good';
                        resolve(statuse);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

}
