import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/model/movie';
import { Observable, fromEvent, BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';

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

  constructor(
    private movieService: MovieService,
    private router: Router,
    private userService: UserService

  ) {}

  ngOnInit(): void {
    // const mYears: Set<number> = new Set<number>();
    this.movies = this.movieService.all();
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
