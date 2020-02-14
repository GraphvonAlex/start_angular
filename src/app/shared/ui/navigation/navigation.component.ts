import { Component, OnInit } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  constructor(
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
