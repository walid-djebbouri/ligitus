import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class MembershipStatusService {
    constructor(private http: HttpClient) {}
    get_membership_status(lawyer_id: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.get(environment.apiUrl + 'lawyermembership/' + lawyer_id).subscribe(
                (membership_status: any[]) => {
                    resolve(membership_status);
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
    create_membership_status(data): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.post(environment.apiUrl + 'membership/' + data['lawyerId'] + '/lawyer/' + data['bundle_id'] + '/bundle' , {
                'quantity': parseInt(data['quantity'] , 0),
                'payer_type' : data['payer_type'],
                'membership_ref' : data['membership_ref'],
                'plan_price':  Number.parseInt(data['plan_price'] , 0) ,
                'CustCat_discount': Number.parseInt(data['CustCat_discount'] , 0) ,
                'special_discount': Number.parseInt(data['special_discount'] , 0) ,
                'final_discount': parseFloat(data['final_discount'])  ,
                'billed_amount':  Number.parseInt(data['billed_amount'] , 0)  ,
                'payment_date': data['payment_date'],
                'payment_type': data['payment_type'],
                'plan_sdate': data['plan_sdate'],
                'plan_edate': data['plan_edate'],
                'remark': data['remark'],
                'payer_name':  data['payer_name'],
                'national_identity_n':  data['national_identity_n'],
                'designation_ref':  data['designation_ref'],
                'payment_ref':  data['payment_ref'],
            }).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        } ));
    }
    delete_membership_status(membership_id: string): Promise<any> {
        return new Promise( ((resolve, reject) => {
            this.http.delete(environment.apiUrl + 'membership/' + membership_id).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }) ) ;
    }
    update_membership(data: any): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.patch(environment.apiUrl + 'membership/' + data['membership_id'] , {
                'membership_ref' : data['membership_ref'],
                'plan_price':  Number.parseInt(data['plan_price'] , 0) ,
                'CustCat_discount': Number.parseInt(data['CustCat_discount'] , 0) ,
                'special_discount': Number.parseInt(data['special_discount'] , 0) ,
                'final_discount': Number.parseInt(data['final_discount'] , 0) ,
                'billed_amount':  Number.parseInt(data['billed_amount'] , 0)  ,
                'payment_date': data['payment_date'],
                'payment_type': data['payment_type'],
                'plan_sdate': data['plan_sdate'],
                'plan_edate': data['plan_edate'],
                'remark': data['remark'],
                'bundleId': data['bundle_id'],
                'payer_name':  data['payer_name'],
                'national_identity_n':  data['national_identity_n'],
                'designation_ref':  data['designation_ref'],
                'payment_ref':  data['payment_ref'],
            }).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
}
