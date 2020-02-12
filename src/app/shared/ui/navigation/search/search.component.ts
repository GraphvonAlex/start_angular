import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/model/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchInput: string;
  public movies: Movie[] = [];
  values = '';

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {

  }

  onKey($event: any) {
    this.values += $event.target.value;
    console.log(this.values.length);
  }

  public doSearch(): void {
    if (this.values.trim().length > 0) {
      this.movieService.byTitle(this.values.trim())
        .pipe(
          take(1)
        )
        .subscribe((Response: Movie[]) => {
          this.movies = Response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`${JSON.stringify(this.movies)}`);
        });
    }
  }
}
