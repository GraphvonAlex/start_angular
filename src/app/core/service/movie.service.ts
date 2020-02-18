import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

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
      apiRoute
    ).pipe(
      take(1),
      map((Response) => {
        return Response;
        // .map((item) => {
        //   this._years.add(item.year);
        //   this.years$.next(Array.from(this._years).sort());
        //   return new Movie().deserialize(item);
        // });
      })
    );
  }

  public updateMovie(movie: any): Observable<HttpResponse<any>> {
    const apiRoute = `${environment.apiRoot}/modify`;
    return this.httpClient.put(
      apiRoute,
      movie,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((Response: HttpResponse<any>) => {
        return Response;
      })
    );
  }
}
