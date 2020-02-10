import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'cinema-app';

  public movie: any = {
    title: 'Joker',
    year: 2019
  }
}
