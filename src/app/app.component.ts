import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'cinema-app';

  public defaultContry = 'all';
  public movies: any [] = [
    {
      title: 'Joker',
      year: 2019,
      contry: 'it'
    },
    {
      title: 'Rome',
      year: 2003,
      contry: 'it'
    },
    {
      title: 'Avengers: End Game',
      year: 2019,
      contry: 'us'
    },
    {
      title: 'Green Book',
      year: 2017,
      contry: 'us'
    }
  ];

  public toggleContry(): void {
    this.defaultContry = (this.defaultContry === 'us') ? this.defaultContry = 'it' : this.defaultContry = 'us';

    this.movies.forEach((movie: any) => {
      movie.show = movie.contry === this.defaultContry;
    });
  }
}
