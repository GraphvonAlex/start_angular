import { Resolve, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
  private preserveFragment: any;
  public constructor(
    private movieService: MovieService,
    public router: Router
  ) {}

  public resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): Observable<any> {
    // tslint:disable-next-line:radix
    const id: number = parseInt(route.paramMap.get('id'));
    console.log(`Hello resolver : ${id}`);

    return  this.movieService.bysingleMovie(id)
    .pipe(
      take(1),
      catchError((error: any, couth: Observable<any>): Observable<any> => {
        console.log(`Error message : ${JSON.stringify(error)}`);
        return this._errorHandler(error);
      })
    );
  }

  private _errorHandler(error: number): Observable<any> {
    if (error === 404) {
      this.router.navigate(['home'], {});
    }
    return of(null);
  }
}
