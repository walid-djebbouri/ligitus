import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {}
    get_users(): Promise<any> {
        return new Promise( ((resolve, reject) => {
            this.http.get(  environment.apiUrl + 'profile?filter={"include":[{"relation" : "lawyer", "scope":{"fields":["id","avokap_ref","bar_name","category","userId"],"include":[\n' +
                '{"relation":"cabinet"}]}}, \n' +
                '{"relation" : "userStatuses","scope":{"fields":["id","status","status_date","userId"],"order" : ["status_date  DESC"]}},\n' +
                '{"relation": "memberships","scope":{"fields":["plan_edate","userId","bundleId"],"order": ["plan_edate DESC"],"include":[{"relation":"bundle","scope":{"fields":["bundle_name","id"]}}]}}]}').subscribe(
                (users: any[]) => {
                    resolve(users) ;
                } ,
                (error) => {
                    reject(error);
                }) ;
        } ) );
    }
    reset_password(data: any): Promise<any> {
        return new Promise(((resolve, reject) => {
            this.http.patch(environment.apiUrl +  'resetlogin/' + data['user_id']  ,
                {
                'newpassword': data['newpassword'],
                }).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
    delete_user(userId: string): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            this.http.delete(environment.apiUrl +  'users/' + userId ).subscribe(
                () => {
                    resolve();
                } ,
                (error) => {
                    reject(error);
                });
        })) ;
    }
    create_user(data): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            this.http.post(environment.apiUrl + 'users' , {
                'project_ref': data['project_ref'] ,
                'email': data['email'],
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'first_name_local': data['first_name_local'],
                'last_name_local': data['last_name_local'],
                'roles': data['roles'] ,
                'join_date': data['join_date'],
                'password': data['password'],

            }).subscribe(
                (user) => {
                    resolve(user);
                } , (error) => {
                    reject(error);
                });
        }));
    }
    change_status(Data): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            this.http.post(environment.apiUrl + 'users/' +  Data['userId']  + '/user-statuses' , {
                'status': Data['status'],
                'status_date': Data['status_date'] ,
                'status_remark': Data['status_remark'] ,
            }).subscribe(
                (User_status) => {
                    resolve(User_status);
                } ,
                (error) => {
                    reject(error);
                });
        }));
    }
    researchUser(profileName: string, pageNumber: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/profilev2/' + pageNumber +
            '/batchnumber/75/maxbatch/200/recbatch/' + profileName + '/profileName?filter={"include":[{"relation" : "lawyer", "scope":{"fields":["id","avokap_ref","bar_name","category","userId"],"include":[{"relation":"cabinet"}]}}, {"relation" : "userStatuses","scope":{"fields":["id","status","status_date","userId"],"order" : ["status_date  DESC"]}},{"relation": "memberships","scope":{"fields":["plan_edate","userId","bundleId"],"order": ["plan_edate DESC"],"include":[{"relation":"bundle","scope":{"fields":["bundle_name","id"]}}]}}]}')
            .pipe( map( users => users ) ) ;
    }

}
