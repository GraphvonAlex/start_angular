import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title = 'cinema-app';
  public defaultContry = 'all';
  public countries: Map<string, any> = new Map<string, any>();

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
        text: 'United States'
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

  constructor() { }

  ngOnInit(): void {
    this.movies.forEach(movie =>{
      this.countries.set(movie.contry.iso, movie.contry);
    });
  }

  public toggleContry(): void {
    this.defaultContry = (this.defaultContry === 'us') ? this.defaultContry = 'it' : this.defaultContry = 'us';
    this.movies.forEach((movie: any) => {
      movie.show = movie.contry.iso === this.defaultContry;
    });
  }
}
