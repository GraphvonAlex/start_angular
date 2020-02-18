import { Person } from './Person';

export class PersonFull extends Person{
  private nationalities: Array<string>;
  private biography: string;

  public deserialize(datas: any): Person {
    Object.assign(this, datas);
    return this;
  }
}
