import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './navigation/search/search.component';
import { ResultComponent } from './navigation/search/result/result.component';



@NgModule({
  declarations: [NavigationComponent, FooterComponent, SearchComponent, ResultComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    SearchComponent
  ]
})
export class UiModule { }
