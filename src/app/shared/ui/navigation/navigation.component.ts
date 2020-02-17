import { Component, OnInit } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/core/model/user-interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  public user: UserInterface;

  constructor(
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

  public doLogout() {
    this.userService.logout();
  }
}
