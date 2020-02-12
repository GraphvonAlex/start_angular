import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/model/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public searchInput: string;

  @Output() moviesEvents: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  public doSearch(): void {
    if (this.searchInput.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.byTitle(this.searchInput.trim())
        .pipe(
          take(1)
        )
        .subscribe((Response: Movie[]) => {
          movies = Response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`Emit : ${JSON.stringify(this.searchInput)}`);
          this.moviesEvents.emit(movies);
        });
    }
  }
}
