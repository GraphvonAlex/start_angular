import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Find all movies 'Observable'
   */
  public all(): Observable<Movie[]> {
    const apiRoute = `${environment.apiRoot}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

  /**
   * Find Movies By Partial title
   */
  public byTitle(title: string): Observable<Movie[]> {
    const apiRoute = `${environment.apiRoot}byTitleP?t=${title}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

}
