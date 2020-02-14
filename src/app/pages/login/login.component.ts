import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  public doLogin(): void {
    if (this.userService.autentificate(this.loginForm.value)) {
      // navigate to home
      this.router.navigate(['home']);
    } else {
      this.snackBar.open(
        'Sorry, your indentification failed',
        '',
        {
          duration: 2500,
          verticalPosition: 'bottom',
        }
      );
      this.loginForm.reset();
    }
  }

}
