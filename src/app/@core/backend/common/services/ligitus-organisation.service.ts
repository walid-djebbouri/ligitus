import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class LigitusOrganisationService {

    readonly  apiUrl: string = 'https://api2.avokap.com/' ;
    constructor(private http: HttpClient) {}

    public createOrganisation(Organisation: any): Observable<any> {
        return this.http.post(   `${this.apiUrl}organisation` , Organisation )
            .pipe(
                map((newOrganisation) => newOrganisation )
            );

    }
}
