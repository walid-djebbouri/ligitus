
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

export abstract class SmartTableData {
  abstract  getData(): Promise<any> ;
  abstract up_date_cabinet(donne: any[]): Promise<any> ;
  abstract cabinet_details(id: string): Promise<any>;
  abstract totale_up_date_cabinet(donne: any[] , id: string): Promise<any>;
  abstract delet_cabinet(id: string): Promise<any>;
  abstract create_cabinet(donne: any[]): Promise<any>;
}
