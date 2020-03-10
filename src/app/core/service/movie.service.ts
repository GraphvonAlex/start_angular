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

  /**
   * Get All movies from database
   */
  public all(): Observable<Movie[]> {
    this._years = new Set<number>();
    const apiRoute = `${environment.movieRoot}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    ).pipe(
      take(1),
      map((Response) => {
        return Response.map((item) => {
          this._years.add(item.releaseDate);
          this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item);
        });
      })
    );
  }

  /**
   * Find single movie by movie id
   * @param id
   */
  public bysingleMovie(id: number): Observable<any> {
    const apiRoute = `${environment.movieRoot}${id}`;
    return this.httpClient.get<any>(
      apiRoute,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response) => {
        return response.body;
      }),
      catchError((error: any) => {
        console.log(`Error message :  ${JSON.stringify(error)}`);
        return throwError(error.status);
      })
    );
  }

  /**
   * Update Selected Movie
   * @param movie
   */
  public updateMovie(movie: any): Observable<HttpResponse<any>> {
    const apiRoute = `${environment.movieRoot}/${movie.id}`;
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

  /**
   * Delete selected movie
   * @param movie
   */
  public deleteMovie(movie: any): Observable<any> {
    const apiRoute = `${environment.movieRoot}/${movie.id}`;
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
