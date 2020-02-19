import { Component, OnInit, Input, } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/core/service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/model/movie';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    public router: ActivatedRoute,
  ) { }

  public get title(): AbstractControl {
    return this.editForm.controls.title;
  }

  public get synopsis(): AbstractControl {
    return this.editForm.controls.synopsis;
  }

  public get year(): AbstractControl {
    return this.editForm.controls.year;
  }

  public get duration(): AbstractControl {
    return this.editForm.controls.duration;
  }
  public movie: any;
  public editForm: FormGroup;

  @Input()
  movieIn: Movie;

  public doUpdate() {
    this.movie.title = this.title.value;
    this.movie.synopsis = this.synopsis.value;
    this.movie.year = this.year.value;
    this.movie.duration = this.duration.value;

    this.movieService.updateMovie(this.movie).pipe(
      take(1)
    ).subscribe((Response: HttpResponse<any>) => {
      console.log('update is done');
    });
  }

  public doDelete() {
    this.movieService.deleteMovie(this.movie)
    .pipe(
      take(1)
    ).subscribe((Response: Observable<any>) => {
      return Response;
    });
  }

  ngOnInit(): void {
    this.router.data.subscribe((data: {movie: any}) => {
      this.movie = data.movie;
      this.editForm = this.formBuilder.group({
        title: [
          this.movie.title, // default value for the control
          Validators.compose([
            Validators.required
          ])
        ],
        synopsis: [
          this.movie.synopsis,
          Validators.compose([
            Validators.required
          ])
        ],
        year: [
          this.movie.year,
          Validators.compose([
            Validators.required
          ])
        ],
        duration: [
          this.movie.duration,
          Validators.compose([
            Validators.required
          ])
        ]
      });

      this.year.setValue(this.movie.year);
      this.title.setValue(this.movie.title)
      this.duration.setValue(this.movie.duration);
      this.synopsis.setValue(this.movie.synopsis);

    });
  }
}
