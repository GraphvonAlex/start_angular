import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from './../model/user-interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: UserInterface[];
  private _user: UserInterface = null;
  public userSubject$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(this._user);

  constructor() {
    this._registeredUsers = new Array<any>();
    this._registeredUsers.push({
      login: 'alex@gmail.com',
      password: 'password',
      token: '1234',
      isAuthenticated: false
    });

    const userLogedIn: string = localStorage.getItem('user');
    if (userLogedIn) {
      const userAsObject: any = JSON.parse(userLogedIn);
      this._user = this._registeredUsers.find((obj: UserInterface) => obj.token === userAsObject.token);
      if (this._user !== undefined) {
        this._user.isAuthenticated = true;
        this.userSubject$.next(this._user);
      } else {
        this.userSubject$.next(null);
      }
    }
  }

  public get user(): UserInterface {
    return this._user;
  }

  public autentificate(user: UserInterface): boolean {
    this._user = this._registeredUsers.find(
      (obj: any) => obj.login === user.login && obj.password === user.password
    );
    if (this._user !== undefined) {
      localStorage.setItem(
        'user',
        JSON.stringify({token: this._user.token})
      );
      this._user.isAuthenticated = true;
      this.userSubject$.next(this._user);
      return true;
    } else {
      this.userSubject$.next(null);
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem('user');
    this._user = null;
    this.userSubject$.next(this._user);
  }
}
