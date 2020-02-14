import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line: variable-name
  private _registeredUsers: any[];
  public isLogedIn: boolean = false;
  constructor(
  ) {
    this._registeredUsers = new Array<any>();
    this._registeredUsers.push({
      login: 'alex@gmail.com',
      password: 'password'
    });
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
      this.isLogedIn = true;
      return true;
    } else {
      return false;
    }
  }
}
