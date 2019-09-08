import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {

    constructor(private http: HttpClient) {
        this.apikey = "Zwh3uI2lTXWZPeIPh4hLuHOlaQfiC1xa";
        this.url = "http://dataservice.accuweather.com/";
    }
    private url: string;
    private apikey: string;
    GetAutocomplete(query): Observable<any> {
      return this.http.get<any>(this.url + "locations/v1/cities/autocomplete?apikey=" + this.apikey + "&q=" + query).pipe(
            retry(1),
            catchError(this.errorHandl)
          );
    }

    GetCurrent(currentLoc):  Observable<any> {
       return this.http.get<any>(this.url + "currentconditions/v1/" + currentLoc + "?apikey=" + this.apikey);
    }
    Get5Days(currentLoc):  Observable<any> {
       return this.http.get<any>(this.url + "forecasts/v1/daily/5day/" + currentLoc + "?apikey=" + this.apikey);
    }


    Post(body: any) {
        return this.http.post(this.url, body)
    }

    errorHandl(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     }

}
