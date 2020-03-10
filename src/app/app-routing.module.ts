import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { MovieComponent } from './pages/movie/movie.component';
import { MovieResolver } from './core/resolver/movie-resolver';
import { PersonComponent } from './pages/person/person.component';
import { PersonResolver } from './core/resolver/person-resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    resolve: {
      movie: MovieResolver
    }
  },
  {
    path: 'person/:id',
    component: PersonComponent,
    resolve: {
      person: PersonResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
