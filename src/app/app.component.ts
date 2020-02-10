import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'cinema-app';

  public movies: any [] = [
    {
      title: 'Joker',
      year: 2019
    },
    {
      title: 'Rome',
      year: 2003
    },
    {
      title: 'Avengers: End Game',
      year: 2019
    }
  ]
}
