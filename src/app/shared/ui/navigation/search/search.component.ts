import { Component, OnInit, } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/model/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public movies: Movie[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  public recivedMovies($event: Movie[]): void {
    this.movies = $event;
    console.log(`Recived ${JSON.stringify(this.movies)}`);
  }
}
