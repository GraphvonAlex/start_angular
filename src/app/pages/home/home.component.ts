import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/model/movie';
import { Observable, fromEvent, BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/core/model/Person';
import { PersonService } from 'src/app/core/service/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title = 'cinema';
  public defaultYear = 0;
  public years: number[] = [];
  public yearsSub: Subscription;
  public movies: Observable<Movie[]>;
  public persons: Observable<Person[]>;

  constructor(
    private movieService: MovieService,
    private personService: PersonService,
    private router: Router,
    private userService: UserService

  ) {}

  ngOnInit(): void {
    // const mYears: Set<number> = new Set<number>();
    this.movies = this.movieService.all();
    this.persons = this.personService.all();
    this.yearsSub = this.movieService.years$
    // tslint:disable-next-line: variable-name
    .subscribe((_years) => {
      this.years = _years;
    });
  }

  public onClick(id: number) {
    if (this.userService.user) {
      this.router.navigateByUrl('movie/' + id);
    } else {
      this.router.navigate(['login']);
    }
  }
}
