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
  public movie: any;
  public editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    public router: ActivatedRoute,
  ) { }

  public get title(): AbstractControl {
    return this.editForm.controls.title;
  }

  public get resume(): AbstractControl {
    return this.editForm.controls.resume;
  }

  public get releaseDate(): AbstractControl {
    return this.editForm.controls.releaseDate;
  }

  public get runtime(): AbstractControl {
    return this.editForm.controls.runtime;
  }

  @Input()
  movieIn: Movie;

  public doUpdate() {
    this.movie.title = this.title.value;
    this.movie.resume = this.resume.value;
    this.movie.releaseDate = this.releaseDate.value;
    this.movie.runtime = this.runtime.value;

    this.movieService.updateMovie(this.movie)
    .pipe(
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
        resume: [
          this.movie.resume,
          Validators.compose([
            Validators.required
          ])
        ],
        releaseDate: [
          this.movie.releaseDate,
          Validators.compose([
            Validators.required
          ])
        ],
        runtime: [
          this.movie.runtime,
          Validators.compose([
            Validators.required
          ])
        ]
      });

      this.releaseDate.setValue(this.movie.releaseDate);
      this.title.setValue(this.movie.title);
      this.runtime.setValue(this.movie.runtime);
      this.resume.setValue(this.movie.resume);

    });
  }
}
