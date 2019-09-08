import {MatButtonModule,MatCheckboxModule,MatMenuModule,
  MatInputModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatListModule, MatAutocompleteModule,MatSnackBarModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatMenuModule,MatInputModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatListModule,MatAutocompleteModule,MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule,MatMenuModule,MatInputModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatListModule,MatAutocompleteModule,MatSnackBarModule],
})
export class MaterialModule { }