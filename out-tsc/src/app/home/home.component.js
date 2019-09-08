import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let HomeComponent = class HomeComponent {
    constructor(_homeService) {
        this._homeService = _homeService;
        this.searchName = "Tel Aviv";
        this.locations = [];
        this.showD = false;
        this.showDropDown = false;
        this.hasError = (controlName, errorName) => {
            return this.ownerForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.ownerForm = new FormGroup({
            search: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
        });
    }
    dataChanged(newObj) {
        this.showDropDown = true;
        return this._homeService.GetAutocomplete(newObj).subscribe((data) => {
            this.locations = data;
        });
        // console.log("location", this.locations);
        //this.showDropDown = false;
    }
    closeDropDown() {
        this.showDropDown = !this.showDropDown;
    }
    selectValue(value) {
        //console.log(value.Key, value);
        if (value.Key) {
            //debugger;
            this._homeService.GetCurrent(value.Key).subscribe((data) => {
                if (data != null) {
                    this.current = data[0];
                    this.showD = true;
                    console.log(this.current);
                }
                else {
                    console.log("no data");
                }
            });
            this._homeService.Get5Days(value.Key).subscribe((data) => {
                if (data != null) {
                    this.current5Days = data;
                    this.showD = true;
                    console.log(this.current5Days);
                }
                else {
                    console.log("no data");
                }
            });
            this.showDropDown = false;
        }
        else {
            console.log("no key provided");
        }
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map