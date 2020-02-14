import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line: variable-name
  private _registeredUsers: any[];
  public isAuthenticated = false;

  constructor() {
    this._registeredUsers = new Array<any>();
    this._registeredUsers.push({
      login: 'alex@gmail.com',
      password: 'password',
      firstName: 'Aleksejs',
      lastName: 'Pridannikovs'
    });

    const userLogedIn: string = localStorage.getItem('user');
    if (userLogedIn) {
      this.isAuthenticated = true;
    }
  }

  public autentificate(user: any): boolean {
    const regUser = this._registeredUsers.find(
      (obj: any) => obj.login === user.login && obj.password === user.password
    );
    if (regUser !== undefined) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
