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

  public async allMovies() {
    const apiRoute = `${environment.apiRoot}`;
    const movies = await this.httpClient.get(environment.apiRoot).toPromise();
    console.log(movies);
    return movies;
    // try {
    //   movies = await fetch(apiRoute);
    //   for (let property in movies) {
    //     console.log('Property : ' + property);
    //   }
    //   movies.json().then((moviesList) => {
    //     console.log('List : ' + JSON.stringify(moviesList));
    //   })
    //   console.log(`Movies : ${movies.json()}`);
    // } catch (error) {
    // }

    // const movies: Promise<Response> = await fetch(apiRoute);
    console.log(`Movies : ${JSON.stringify(movies)}`);
  }

  /**
   * Find all movies
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
