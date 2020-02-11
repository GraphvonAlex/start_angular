import { Component,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'cinema-app';

  public defaultContry = 'all';
  public countries: Set<string> = new Set();
  public movies: any [] = [
    {
      title: 'Italian Movie',
      year: 1993,
      contry: {
        iso: 'it',
        text: 'Italie'
      }
    },
    {
      title: 'Intouchable ',
      year: 2011,
      contry: {
        iso: 'fr',
        text: 'France'
      }
    },
    {
      title: 'Rec',
      year: 2007,
      contry: {
        iso: 'es',
        text: 'Spain'
      }
    },
    {
      title: 'Joker',
      year: 2019,
      contry: {
        iso: 'us',
        text: 'United States of America'
      }
    },
    {
      title: 'GreenBook',
      year: 2017,
      contry: {
        iso: 'us',
        text: 'United States'
      }
    }
  ];

  public toggleContry(): void {
    this.defaultContry = (this.defaultContry === 'us') ? this.defaultContry = 'it' : this.defaultContry = 'us';
    this.movies.forEach((movie: any) => {
      movie.show = movie.contry.iso === this.defaultContry;
    });
  }

  public constructor() {
    this.filter();
  }

  public filter(): void {
    this.movies.forEach(movie =>{
      this.countries.add(movie.contry);
    });
  }
}
