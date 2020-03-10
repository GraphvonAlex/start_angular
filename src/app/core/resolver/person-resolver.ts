import { Resolve, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PersonService } from '../service/person.service';

@Injectable({
  providedIn: 'root'
})
export class PersonResolver implements Resolve<any> {
  public constructor(
    private personService: PersonService,
    public router: Router
  ) {}

  public resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): Observable<any> {
    // tslint:disable-next-line:radix
    const id: number = parseInt(route.paramMap.get('id'));
    console.log(`Hello resolver : ${id}`);

    return  this.personService.single(id)
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
