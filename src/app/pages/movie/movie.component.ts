import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;

  constructor(
    public router: ActivatedRoute,
    public movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: any) => {
      console.log(`params :  ${paramMap.params.id}`);
      this.movieService.bysingleMovie(paramMap.params.id).subscribe((movie: any) => {
        this.movie = movie;
      });
    });
  }

}
