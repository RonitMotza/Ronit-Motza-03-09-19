import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public ownerForm: FormGroup;
  constructor(private _homeService: HomeService, private _snackBar: MatSnackBar) {
}
  searchName = "Tel Aviv";
  locations: any = [];
  showD = false;
  current: any;
  currentLocation: any;
  current5Days: any;
  showDropDown = false;
  allFavoriteForStorage = [];
  ngOnInit() {
    this.ownerForm = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    });

    this.getLocalStorage();
    var val = {Key:'215854'}
    this.selectValue(val);
    console.log('allFavoriteForStorage', this.allFavoriteForStorage);
    this.showDropDown = false;
  }

  getLocalStorage() {
    if (localStorage.getItem('allFavoriteForStorage') === null) {
      this.allFavoriteForStorage = [];
    } else {
      this.allFavoriteForStorage = [];
      this.allFavoriteForStorage = JSON.parse(localStorage.getItem('allFavoriteForStorage'));
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 500000,
      verticalPosition: 'top',
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  dataChanged(newObj) {
    this.showDropDown = true;
    return this._homeService.GetAutocomplete(newObj).subscribe((data: {}) => {
      this.locations = data;
    },error => ( this.openSnackBar("Server Error !", "close")))
  }

  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  selectValue(value) {
    if (value.Key) {
      this.currentLocation = value;
      this._homeService.GetCurrent(value.Key).subscribe((data: {}) => {
        if (data != null) {
          this.current = data[0];
          this.showD = true;
          console.log(this.current);
        
        }
        else {
          this.openSnackBar("no data", "close");
        }
      },error => (   this.showDropDown = false, this.openSnackBar("Server Error !", "close"))
      )

      this._homeService.Get5Days(value.Key).subscribe((data: {}) => {
        if (data != null) {
          this.current5Days = data;
          this.current5Days = this.current5Days.DailyForecasts;
          this.showD = true;
          console.log(this.current5Days);
        }
        else {
          console.log("no data");
        }
      },error => ( this.openSnackBar("Server Error !", "close")))
      this.showDropDown = false;
    }
    else {
     this.openSnackBar("no key provided !", "close");
    }
  }


  addToFavorite() {
   // debugger;
    if (this.allFavoriteForStorage.length === 0) {
     // debugger;
      if (this.currentLocation != null) {
        this.allFavoriteForStorage.push(this.currentLocation);
        localStorage.setItem('allFavoriteForStorage', JSON.stringify(this.allFavoriteForStorage));
        this.openSnackBar("Successfully Added!", "close");
      }
      else {
        this.openSnackBar("canot save empty favorite to local storage", "close");
      }
    }
    else {
      for (let val of this.allFavoriteForStorage) {
        if (val.Key === this.currentLocation.Key) {
          this.openSnackBar("Allready exist", "close");
        }
        else {
          var exist = this.allFavoriteForStorage.filter(v => v.Key === this.currentLocation.Key);
          //debugger;
          if (exist.length == 0) {
            this.allFavoriteForStorage.push(this.currentLocation);
            localStorage.setItem('allFavoriteForStorage', JSON.stringify(this.allFavoriteForStorage));
            this.openSnackBar("Successfully Added!", "close");
          }
        }
      }
    }

  }

}
