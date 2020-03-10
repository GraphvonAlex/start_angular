import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/service/movie.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public singleMovie: any;

  constructor(
    public router: ActivatedRoute,
    public movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: any) => {
      console.log(`params :  ${paramMap.params.id}`);
      this.movieService.bysingleMovie(paramMap.params.id).subscribe((movie: any) => {
        this.singleMovie = movie;
      });
    });
  }

}
