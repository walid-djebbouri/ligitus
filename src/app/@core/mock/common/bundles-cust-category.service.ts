import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
@Injectable({providedIn: 'root'})
export class BundlesCustCategoryService {
    costumer_categories = [];
    constructor(private  http: HttpClient) {
    }
    get_bundle():  Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.get(environment.apiUrl + 'bundle').subscribe((bundle: any[]) => {
                resolve(bundle);

            },
            (error) => {
                reject(error);
            });
        });
    }
    get_cust_category(): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.get(environment.apiUrl +  'custcat').subscribe((cust: any[]) => {
                resolve(cust);
            }),
                ((error) => {
                    reject(error);
                });
        }));
    }
    create_category(donnee): Promise<any> {
        return  new Promise(((resolve, reject) => {
            this.http.post(environment.apiUrl + 'custcat' , {
                'custcat_Ref' : donnee['custcat_ref'] ,
                'category' :   donnee['category'],
                'discount' :  Number.parseInt(donnee['discount'] , 0) ,
                'grace_period' : Number.parseInt(donnee['grace_period'] , 0)  ,
                'remark' :  donnee['remark'],
            } ).subscribe(
                (category) => {
                    resolve(category);
                } ,
                (error) => {
                reject(error);
            } ) ;
        }));
    }
    delete_category(id: string): Promise<any> {
        return  new Promise( ((resolve, reject) => {
            this.http.delete( environment.apiUrl + 'custcat/' + id ).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }) );
    }
    update_customer_category(donnee , id): Promise<any> {
        return new Promise( ((resolve, reject) => {
            this.http.patch(environment.apiUrl + 'custcat/' + id , {
                'custcat_Ref' : donnee['custcat_ref'] ,
                'category' :   donnee['category'],
                'discount' :  Number.parseInt(donnee['discount'] , 0) ,
                'grace_period' : Number.parseInt(donnee['grace_period'] , 0)  ,
                'remark' :  donnee['remark'],
            }).subscribe(
                (category) => {
                    resolve(category);
                } ,
                (error) => {
                    reject(error);
                });
        } ) );
    }
    create_bundle(donnee): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.post(environment.apiUrl + 'bundle', {
                'bundle_ref': donnee['bundle_ref'],
                'bundle_name': donnee['bundle_name'],
                'plan_price':  Number.parseInt(donnee['plan_price'] , 0) ,
                'currency': donnee['currency'],
                'nbmonths':  Number.parseInt(donnee['nbmonths'] , 0)  ,
                'bundle_sdate':  (donnee['bundle_sdate']) ,
                'bundle_edate': donnee['bundle_edate'],
                'description': donnee['description'],
                'quantity_max':   parseInt(donnee['quantity_max'] , 0) ,
            }).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
    update_bundle(bundle_id: string , donnee): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.patch(environment.apiUrl + 'bundle/' + bundle_id , {
                'bundle_ref': donnee['bundle_ref'],
                'bundle_name': donnee['bundle_name'],
                'plan_price':  Number.parseInt(donnee['plan_price'] , 0) ,
                'currency': donnee['currency'],
                'nbmonths':  Number.parseInt(donnee['nbmonths'] , 0)  ,
                'bundle_sdate':  (donnee['bundle_sdate']) ,
                'bundle_edate': donnee['bundle_edate'],
                'description': donnee['description'],
                'quantity_max': parseInt( donnee['quantity_max'] , 0)  ,
            } ).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
    delete_bundle(bundle_id: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.delete(environment.apiUrl + 'bundle/' + bundle_id ).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        } ));
    }
    getAllBundlesMonths(): Promise<any> {
        const Avokap_Basic = [];
        const Avokap_Classic = [];
        const Avokap_Premium = [];
        const Avokap = [];

        return new Promise<any>(((resolve, reject) => {
            this.http.get( environment.apiUrl + 'bundle-number-apd').subscribe(
                (allBundles: any[]) => {
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP BASIC' && bundle.time_period.match('2022') ) {
                            Avokap_Basic.push( parseInt( bundle.count , 0))  ;
                        }
                    });
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP CLASSIC' && bundle.time_period.match('2022') ) {
                            Avokap_Classic.push( parseInt(bundle.count , 0))  ;
                        }
                    });
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP PREMIUM' && bundle.time_period.match('2022') ) {
                            Avokap_Premium.push( parseInt(bundle.count , 0))  ;
                        }
                    });
                    Avokap.push(Avokap_Basic);
                    Avokap.push(Avokap_Classic);
                    Avokap.push(Avokap_Premium);
                    resolve(Avokap);
                } ,
                (error) => {
                    reject(error);
                });
        })) ;
    }
    getDataForMonth(): Observable<any> {
        const Avokap_Basic = [];
        const Avokap_Classic = [];
        const Avokap_Premium = [];
        const Avokap = [];

        return this.http.get( environment.apiUrl + 'bundle-number-apd').pipe(
            map(
                (allBundles: any[]) => {
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP BASIC' && bundle.time_period.match('2022') ) {
                            Avokap_Basic.push( parseInt( bundle.count , 0))  ;
                        }
                    });
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP CLASSIC' && bundle.time_period.match('2022') ) {
                            Avokap_Classic.push( parseInt(bundle.count , 0))  ;
                        }
                    });
                    allBundles.filter(bundle => {
                        if (bundle.bundle_name === 'AVOKAP PREMIUM' && bundle.time_period.match('2022') ) {
                            Avokap_Premium.push( parseInt(bundle.count , 0))  ;
                        }
                    });
                    Avokap.push(Avokap_Basic);
                    Avokap.push(Avokap_Classic);
                    Avokap.push(Avokap_Premium);
                    return Avokap; }));
    }
    getDataForYear(): Observable<any> {
        const Avokap_Basic = [];
        const Avokap_Classic = [];
        const Avokap_Premium = [];
        const Avokap = [];
        let years = [];
        return this.http.get( environment.apiUrl + 'bundle-number-apd').pipe(
            map(
                (allBundles: any[]) => {
                    years = this.years(allBundles);
                    for ( let i = 0 ; i < years.length ; i++) {
                        let count_basic   = 0;
                        let count_classic = 0;
                        let count_premium = 0;

                        allBundles.filter(bundle => {
                            if (bundle.bundle_name === 'AVOKAP BASIC' && bundle.time_period.match( years[i] )) {
                                count_basic = count_basic + parseInt( bundle.count , 0) ;
                            }
                        });
                        Avokap_Basic.push(count_basic) ;
                        allBundles.filter(bundle => {
                            if (bundle.bundle_name === 'AVOKAP CLASSIC' && bundle.time_period.match(years[i]) ) {
                                count_classic = count_classic + parseInt( bundle.count , 0) ;
                            }
                        });
                        Avokap_Classic.push(count_classic);
                        allBundles.filter(bundle => {
                            if (bundle.bundle_name === 'AVOKAP PREMIUM' && bundle.time_period.match(years[i]) ) {
                                count_premium = count_premium + parseInt( bundle.count , 0) ;
                            }
                        });
                        Avokap_Premium.push(count_premium);
                    }
                    Avokap.push(Avokap_Basic);
                    Avokap.push(Avokap_Classic);
                    Avokap.push(Avokap_Premium);
                    Avokap.push(years);
                    return Avokap; }));
    }
    format(period: string): string {
        let year = '' ;
        for ( let i = 3 ; i < period.length ; i++ ) {
            year = year + period[i];
        }
        return year ;
    }
    years(bundles): string[] {
        const year = [];
        year.push(this.format(bundles[0].time_period));
        for ( let j = 0 ; j < bundles.length ; j++) {

            if ( !year.includes(this.format(bundles[j].time_period))) {
                year.push(this.format(bundles[j].time_period));

            }
        }
        return year ;
    }
    getMembershipForMonth(): Observable<any> {
        const year: string = new Date().getFullYear().toString();
        const Membership_Downgrade = [];
        const Membership_Dropoff = [];
        const Membership_New = [];
        const Membership_Renewal = [];
        const Membership_Upgrade = [];
        const Membership: any[] = [0 , 0 , 0 , 0 , 0 ];
        this.http.get(environment.apiUrl + 'membership-new-apd').pipe(
            map(
                (New: any[]) => {
                    New.filter(membership => {
                        if (membership.time_period.match(year)) {
                            Membership_New.push(parseInt(membership.count_membership_new, 0));
                        }
                    });
                    return Membership_New;
                })).subscribe((membership_new) => {Membership.splice(0, 1 , membership_new);  });
        this.http.get(environment.apiUrl + 'membership-renewal-apd').pipe(
            map(
                (Renewal: any[]) => {
                    Renewal.filter(membership => {
                        if (membership.time_period.match(year)) {
                            Membership_Renewal.push(parseInt(membership.count_membership_renewal, 10));
                        }
                    });
                    return Membership_Renewal;
                })).subscribe((membership_Renewal) => {Membership.splice(1 , 1 , membership_Renewal)  ;
        });
        this.http.get(environment.apiUrl + 'membership-upgrade-apd').pipe(
            map(
                (Upgrade: any[]) => {
                    Upgrade.filter(membership => {
                        if (membership.time_period.match(year)) {
                            Membership_Upgrade.push(parseInt(membership.count_membership_upgrade, 0));
                        }
                    });
                    return Membership_Upgrade ;
                })).subscribe((membership_Upgrade) => {Membership.splice(2 , 1 , membership_Upgrade) ; });
        this.http.get(environment.apiUrl + 'membership-downgrade-apd').pipe(
            map(
                (downGrade: any[]) => {
                    downGrade.filter(membership => {
                        if (membership.time_period.match(year)) {
                            Membership_Downgrade.push(parseInt(membership.count_membership_downgrade, 0));
                        }
                    });
                    return Membership_Downgrade;
                })).subscribe((membership_downgrade) => {Membership.splice(3, 1, membership_downgrade) ; });

        this.http.get(environment.apiUrl + 'membership-dropoff-apd').pipe(
            map(
                (Dropoff: any[]) => {
                    Dropoff.filter(membership => {
                        if (membership.time_period.match(year)) {
                            Membership_Dropoff.push(parseInt(membership.count_membership_dropoff, 0));
                        }
                    });
                    return Membership_Dropoff;
                })).subscribe((membership_dropoff) => {Membership.splice(4 , 1 , membership_dropoff) ; });
        return of(Membership);
    }

    getMembershipForYear(): Observable<any> {
        const Membership_Downgrade: number[] = [];
        const Membership_Dropoff: number[] = [];
        const Membership_New: number[] = [];
        const Membership_Renewal: number[] = [];
        const Membership_Upgrade: number[] =  [];
        const Membership: any[] = [ 0 , 0 , 0 , 0 , 0 ];

        this.http.get(environment.apiUrl + 'membership-new-apd').pipe(
            map(
                (New: any[]) => {
                    const years = this.years(New) ;
                    for (let i = 0 ; i < years.length ; i++) {
                        let count_new = 0 ;
                        New.filter(membership => {
                            if (membership.time_period.match(years[i])) {
                                count_new = count_new + parseInt(membership.count_membership_new, 10) ;
                            }
                        });
                        Membership_New.push(0);

                        Membership_New.push(count_new);
                    }
                    return Membership_New;
                })).subscribe((membership_new) => {Membership.splice(0  , 1 , membership_new);  });
        this.http.get(environment.apiUrl + 'membership-renewal-apd').pipe(
            map(
                (Renewal: any[]) => {
                    const years = this.years(Renewal) ;
                    for (let i1 = 0 ; i1 < years.length ; i1++) {
                        let count_renewal = 0 ;
                        Renewal.filter(membership => {
                            if (membership.time_period.match(years[i1])) {
                                count_renewal = count_renewal + parseInt(membership.count_membership_renewal, 0) ;
                            }
                        });
                        Membership_Renewal.push(0);

                        Membership_Renewal.push(count_renewal);
                    }
                    return Membership_Renewal;
                })).subscribe((membership_Renewal) => {Membership.splice(1  , 1 , membership_Renewal);
        });
        this.http.get(environment.apiUrl + 'membership-upgrade-apd').pipe(
            map(
                (Upgrade: any[]) => {
                    const years = this.years(Upgrade) ;
                    for (let i2 = 0 ; i2 < years.length ; i2++) {
                        let count_upgrade = 0 ;
                        Upgrade.filter(membership => {
                            if (membership.time_period.match(years[i2])) {
                                count_upgrade = count_upgrade + parseInt(membership.count_membership_upgrade, 0) ;
                            }
                        });
                        Membership_Upgrade.push(0);

                        Membership_Upgrade.push(count_upgrade);
                    }
                    return Membership_Upgrade ;
                })).subscribe((membership_Upgrade) => {Membership.splice(2  , 1 , membership_Upgrade); });
        this.http.get(environment.apiUrl + 'membership-downgrade-apd').pipe(
            map(
                (downGrade: any[]) => {
                    const years = this.years(downGrade) ;
                    for (let i3 = 0 ; i3 < years.length ; i3++) {
                        let count_downgrade = 0 ;
                        downGrade.filter(membership => {
                            if (membership.time_period.match(years[i3])) {
                                count_downgrade = count_downgrade + parseInt(membership.count_membership_downgrade, 0) ;
                            }
                        });
                        Membership_Downgrade.push(0);

                        Membership_Downgrade.push(count_downgrade);
                    }
                    return Membership_Downgrade;
                })).subscribe((membership_downgrade) => {Membership.splice(3 ,  1, membership_downgrade); });

        this.http.get(environment.apiUrl + 'membership-dropoff-apd').pipe(
            map(
                (Dropoff: any[]) => {
                    const years = this.years(Dropoff) ;
                    for (let i4 = 0 ; i4 < years.length ; i4++) {
                        let count_dropoff = 0 ;
                        Dropoff.filter(membership => {
                            if (membership.time_period.match(years[i4])) {
                                count_dropoff = count_dropoff + parseInt(membership.count_membership_dropoff, 0) ;
                            }
                        });
                        Membership_Dropoff.push(0);

                        Membership_Dropoff.push(-count_dropoff);
                    }
                    return Membership_Dropoff;
                })).subscribe((membership_dropoff) => {Membership.splice( 4 , 1 , membership_dropoff ); });
        return of(Membership);
    }
    getStatusOfStat(): Observable<any> {
        const Algeria: any[] = [] ;
        return  this.http.get(environment.apiUrl + 'lawyer-status-wilaya').pipe(
            map((statusOfStates: any[]) => {
                for (let i = 0 ; i < statusOfStates.length ; i++) {
                    Algeria.push({
                        'state' : statusOfStates[i].wilaya ,
                        'values' :
                        [
                            parseInt(statusOfStates[i].terminated_account , 0) ,
                            parseInt(statusOfStates[i].onhold_account , 0) ,
                            parseInt(statusOfStates[i].browse_account , 0) ,
                            parseInt(statusOfStates[i].active_account , 0) ,
                            parseInt(statusOfStates[i].total_registred , 0) ,
                        ] ,
                    });
                }
                return Algeria ;

            } )) ;
    }
    getUserActivityDaily(): Observable<any[]> {
        const userActive: number[] = new Array(49);
        const userInActive: number[] = new Array(49);
        const userData = [];
        return this.http.get( environment.apiUrl + 'user-activity-daily').pipe(
            map((userActivity: any[]) => {
               for (let i = 0 ; i < userActivity.length ; i++  ) {
                   userActive[i] =  parseInt((userActivity[i].active_users) , 0)  ;
                   userInActive[i] = parseInt((userActivity[i].inactive_users) , 0) ;
               }
               userData.push(userActive) ;
               userData.push(userInActive);
               return userData ;
            }),
        ) ;
    }
    getTotalTaregetForRegion(): Observable<any> {
        const Algeria: any[] = [] ;
        return  this.http.get(environment.apiUrl + 'lawyer-status-wilaya').pipe(
            map((statusOfStates: any[]) => {
                Algeria.push({
                    'state' : 'national Total' ,
                    'value' : statusOfStates[0].national_total ,
                });
                for (let i = 0 ; i < statusOfStates.length ; i++) {
                    Algeria.push({
                        'state' : statusOfStates[i].wilaya ,
                        'objective' : parseInt(statusOfStates[i].region_objective , 0) ,
                        'registred' : parseInt(statusOfStates[i].total_registred , 0) ,
                    });
                }
                return Algeria ;

            } )) ;
    }
    getUserDailyHistorical(): Observable<any> {
        const dailyActivity: number[] = [] ;
        return this.http.get( environment.apiUrl + 'user-activity-week').pipe(
            map( (dailyHistorical: any[]) => {
                for ( let i = 1 ; i < 9 ; i++) {
                    dailyActivity.push( parseFloat(dailyHistorical[i].activity_count) ) ;
                }
                return dailyActivity  ;
            } )) ;
    }
    getUserMonthlyHistorical(): Observable<any> {
        const monthlyActivity: number[] = [] ;
        return this.http.get( environment.apiUrl + 'user-activity-month').pipe(
            map( (monthlyHistorical: any[]) => {
                for ( let i = 0 ; i < 13 ; i++) {
                    monthlyActivity.push(parseFloat(monthlyHistorical[i].activity_count)) ;
                }
                return monthlyActivity  ;
            } )) ;
    }
    getUserYearlyHistorical(): Observable<any> {
        const yearlyActivity = [] ;
        return this.http.get( environment.apiUrl + 'user-activity-year').pipe(
            map( (yearlyHistorical: any[]) => {
                for ( let i = 0 ; i < 6 ; i++) {
                    yearlyActivity.push(parseFloat(yearlyHistorical[i].activity_count)) ;
                }
                return yearlyActivity  ;
            } )) ;
    }
    getWeeklyActivitiesOfStates(): Observable<any> {
        return this.http.get( environment.apiUrl + 'user-activity-regional-week').pipe(
            map( (WeeklyActivitiesOfStates) => {
                return WeeklyActivitiesOfStates ;
            } )) ;
    }
    getMonthlyActivitiesOfStates(): Observable<any> {
        return this.http.get( environment.apiUrl + 'user-activity-regional-month').pipe(
            map( (MonthlyActivitiesOfStates) => {
                return MonthlyActivitiesOfStates ;
            } )) ;
    }
    getYearlyActivitiesOfStates(): Observable<any> {
        return this.http.get( environment.apiUrl + 'user-activity-regional-year').pipe(
            map( (YearlyActivitiesOfStates) => {
                return YearlyActivitiesOfStates ;
            } )) ;
    }
    getBundlesProportions(): Observable<any> {
        const proportionsBundles: number[] = [] ;
        return this.http.get( environment.apiUrl + 'current-membership-bundles' ).pipe(
            map((Bundles: any[]) => {
                proportionsBundles.push( parseInt(Bundles[0].number_user , 0) ) ;
                proportionsBundles.push( parseInt(Bundles[1].number_user , 0) ) ;
                proportionsBundles.push( parseInt(Bundles[2].number_user , 0) ) ;
                return proportionsBundles;
        }) ) ;
    }
    getMembershipTotal(): Observable<number[]> {
        const membershipTotal: number[] = [] ;
        return this.http.get(environment.apiUrl + 'membership-total').pipe(
            map((membershipsTotal: any[]) => {
                membershipTotal.push( parseInt(membershipsTotal[0].count_total   , 10) ) ;
                membershipTotal.push( parseInt(membershipsTotal[0].count_last_month , 10) ) ;
                membershipTotal.push( parseInt(membershipsTotal[0].count_last_week , 10) ) ;
                return membershipTotal ;
            })) ;
    }
    getActivityUserRealTime(): Observable<number[]> {
        const realTime: number[] = [] ;
        return this.http.get(environment.apiUrl + 'active-users-rt').pipe(
            map((userActivity: any[]) => {
                for ( let i = 0 ; i < userActivity.length ; i++) {
                    realTime.push(  parseInt(userActivity[i].active_users_count ,  10) ) ;
                }
                return realTime ;
            })) ;
    }
}
