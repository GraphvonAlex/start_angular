import { Movie } from './movie';
import { Person } from './Person';

export class MovieFull extends Movie {
  private duration: number;
  private director: Person;
  private genres: Array<string>;
  public actors: Array<Person>;
  private synopsis: string;

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
