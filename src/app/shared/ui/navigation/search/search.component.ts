import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { Movie } from 'src/app/core/model/movie';
import { take, tap, debounceTime, distinctUntilChanged, map  } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public movies: Observable<Movie[]>;
  public searchForm: FormGroup;

  constructor(
    public router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {}

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
    this.searchTerm.valueChanges
    .pipe(
      debounceTime(400),
      map(() => {
        this.reload();
      })
    ).subscribe();
  }

  // public recivedMovies($event: Movie[]): void {
  //   this.movies = $event;
  // }

  private reload(): void {
    if (this.searchTerm.value.trim().length >= 2) {
      // this.movies = this.movieService.byTitle(this.searchTerm.value.trim());
    } else {
      this.movies = null;
    }
  }
}
