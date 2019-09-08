import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
let HomeService = class HomeService {
    constructor(http) {
        this.http = http;
        this.apikey = "Zwh3uI2lTXWZPeIPh4hLuHOlaQfiC1xa";
        this.url = "http://dataservice.accuweather.com/";
    }
    GetAutocomplete(query) {
        return this.http.get(this.url + "locations/v1/cities/autocomplete?apikey=" + this.apikey + "&q=" + query).pipe(retry(1), catchError(this.errorHandl));
    }
    GetCurrent(currentLoc) {
        return this.http.get(this.url + "currentconditions/v1/" + currentLoc + "?apikey=" + this.apikey);
    }
    Get5Days(currentLoc) {
        return this.http.get(this.url + "forecasts/v1/daily/5day/" + currentLoc + "?apikey=" + this.apikey);
    }
    Post(body) {
        return this.http.post(this.url, body);
    }
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
};
HomeService = tslib_1.__decorate([
    Injectable()
], HomeService);
export { HomeService };
//# sourceMappingURL=home.service.js.map