import { Person } from './Person';

export class Movie {
  public idMovie: number;
  public title: string;
  public year: number;

  public static compare(a: Movie, b: Movie): number {
    // tslint:disable-next-line: no-unused-expression
    a.idMovie < b.idMovie ? -1 : 1;
    return 0;
  }

  public compareTo(movie: Movie): boolean {
    return this.idMovie === movie.idMovie;
  }

  public deserialize(datas: any): Movie {
    Object.assign(this, datas);
    return this;
  }

}
