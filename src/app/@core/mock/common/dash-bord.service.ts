import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({providedIn: 'root'})
export class DashBordService {
    constructor(private  http: HttpClient) {}
    getAllBundlesMonths(): Promise<any> {
        let Avokap_Basic: any[];
        return new Promise<any>(((resolve, reject) => {
            this.http.get( environment.apiUrl + 'bundle-number-apd').subscribe(
                (allBundles: any[]) => {
                    Avokap_Basic = allBundles.filter(bundle => {
                        (bundle.bundle_name === 'AVOKAP BASIC' && bundle.time_period.match('2010') );
                        return bundle.count ;
                    });
                    resolve(allBundles);
                } ,
                (error) => {
                    reject(error);
                });
        })) ;
    }
    getAllBundles(): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            this.http.get( environment.apiUrl + 'bundle-number-apd').subscribe(
                (allBundles) => {
                    resolve(allBundles);
                } ,
                (error) => {
                    reject(error);
                });
        })) ;
    }
}
