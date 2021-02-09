import{NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  imports: 
    [
      MatButtonModule, MatCheckboxModule,MatToolbarModule,MatCardModule,
      MatSnackBarModule,MatTableModule,MatGridListModule,MatIconModule,
      MatMenuModule,MatSidenavModule,MatListModule,MatTooltipModule,
      MatSelectModule,MatAutocompleteModule
    ],
  exports:
    [
      MatButtonModule, MatCheckboxModule,MatToolbarModule,MatCardModule,
      MatSnackBarModule,MatTableModule,MatGridListModule,MatIconModule,
      MatMenuModule,MatSidenavModule,MatListModule,MatTooltipModule,
      MatSelectModule,MatAutocompleteModule
    ],
})
export class MaterialModule { }