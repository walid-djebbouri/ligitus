
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Observable} from 'rxjs';

export abstract class SmartTableData {
  cabinet;
  Cabinets;
  abstract  getData(): Promise<any> ;
  abstract cabinet_details(id: string): Promise<any>;
  abstract totale_up_date_cabinet(donne: any[] , id: string): Promise<any>;
  abstract delete_cabinet(id: string): Promise<any>;
  abstract create_cabinet(donne: any[]): Promise<any>;
  abstract create_lawyer(donne: any[]): Promise<any>;
  abstract up_date_lawyer(donne: any[]): Promise<any> ;
  abstract delete_lawyer(userId: string): Promise<any> ;
  abstract get_cabinet_of_lawyer(userId: string): Promise<any> ;
  abstract change_Cabinet(donne: any[]): Promise<any> ;
  abstract deleteUserStatus(id: string): Observable<any>;



}
