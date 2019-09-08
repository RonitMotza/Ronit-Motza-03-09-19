import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  allFavoriteForStorage = [];
  newArray = [];
  constructor(private _homeService: HomeService, private _snackBar: MatSnackBar,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getLocalStorage();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 500000,
      verticalPosition: 'top',
    });
  }


  getLocalStorage() {
    if (localStorage.getItem('allFavoriteForStorage') === null) {
      this.allFavoriteForStorage = [];
    } else {
      this.allFavoriteForStorage = JSON.parse(localStorage.getItem('allFavoriteForStorage'));

      for (let val of this.allFavoriteForStorage) {
        this._homeService.GetCurrent(val.Key).subscribe((data: {}) => {
          this.newArray.push({
            key:val.Key,
            city: val.AdministrativeArea.LocalizedName,
            country:val.Country.LocalizedName,
              data: data[0]});
        },error => ( this.openSnackBar("Server Error !", "close")))
      }
      console.log(  this.newArray);
    }
  }
  
}

