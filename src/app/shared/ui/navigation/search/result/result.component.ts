import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/model/movie';
import { take } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public movies: Movie[] = [];
  public searchForm: FormGroup;

  @Input()
  DBMovies: Observable<Movie[]>;

  constructor(
    private movieService: MovieService,
    ) { }

  ngOnInit(): void {
  }

  // public doSearch(): void {
  //   if (this.searchTerm.value.trim().length > 0) {
  //     let movies: Movie[] = [];
  //     this.movieService.byTitle(this.searchTerm.value.trim())
  //       .pipe(
  //         take(1)
  //       )
  //       .subscribe((Response: Movie[]) => {
  //         movies = Response.map((movie: any) => {
  //           return new Movie().deserialize(movie);
  //         });
  //         console.log(`Emit : ${JSON.stringify(movies)}`);
  //         this.moviesEvents.emit(movies);
  //       });
  //   }
  // }

}
