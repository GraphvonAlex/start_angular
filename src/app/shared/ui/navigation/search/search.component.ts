import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/model/movie';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public movies: Movie[] = [];
  public searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
    ) { }

  public get searchTerm(): AbstractControl {
    return this.searchForm.controls.searchTerm;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [
        '', // default value for the control
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]
    });
  }

  public recivedMovies($event: Movie[]): void {
    this.movies = $event;
    console.log(`Recived ${JSON.stringify(this.movies)}`);
  }

  public reload(): void {
    if (this.searchTerm.value.trim().length >= 2) {
      const movies: Movie[] = [];
      this.movieService.byTitle(this.searchTerm.value.trim())
        .pipe(
          take(1)
        )
        .subscribe((Response: Movie[]) => {
          this.movies = Response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
        });
    } else {
      this.movies = [];
    }
  }
}
