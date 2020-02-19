import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(Array.from(this._years).sort());

  constructor(
    private httpClient: HttpClient,
  ) { }

  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute = `${environment.apiRoot}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    ).pipe(
      take(1),
      map((Response) => {
        return Response.map((item) => {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item);
        });
      })
    );
  }

  public byTitle(title: string): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute = `${environment.apiRoot}byTitleP?t=${title}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    ).pipe(
      take(1),
      map((Response) => {
        return Response.map((item) => {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item);
        });
      })
    );
  }

  public bysingleMovie(idMovie: number): Observable<any> {
    const apiRoute = `${environment.apiRoot}${idMovie}`;
    return this.httpClient.get<any>(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response) => {
        return response.body;
        // .map((item) => {
        //   this._years.add(item.year);
        //   this.years$.next(Array.from(this._years).sort());
        //   return new Movie().deserialize(item);
        // });
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  public updateMovie(movie: any): Observable<HttpResponse<any>> {
    const apiRoute = `${environment.apiRoot}/modify`;
    return this.httpClient.put(
      apiRoute,
      movie,
      {
        observe: 'response',
      }
    ).pipe(
      take(1),
      map((Response: HttpResponse<any>) => {
        return Response;
      })
    );
  }

  public deleteMovie(movie: any): Observable<any> {
    const apiRoute = `${environment.apiRoot}deleteMovie/${movie.idMovie}`;
    return this.httpClient.delete(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((Response) => {
        return Response;
      })
    );
  }
}
