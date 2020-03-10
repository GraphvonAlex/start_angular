import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../model/Person';
import { environment } from 'src/environments/environment';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get All persones : Actors : Director
   */
    public all(): Observable<Person[]> {
      const apiRoute = `${environment.personRoot}`;
      return this.httpClient.get<Person[]>(
        apiRoute
      ).pipe(
        take(1),
        map((Response) => {
          return Response.map((item) => {
            return new Person().deserialize(item);
          });
        })
      );
    }

    /**
     * Get single Person
     * @param id
     */
    public single(id :number): Observable<any> {
      const apiRoute = `${environment.personRoot}${id}`;
      return this.httpClient.get<any>(
        apiRoute,
        {
          observe : 'response'
        }
      ).pipe(
        take(1),
        map((response) => {
          return response.body;
        }),
        catchError((error :any) => {
          return throwError(error.status);
        })
      );
    }
}
