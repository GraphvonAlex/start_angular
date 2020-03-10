export class Person {
  private id: number;
  private firstname: string;
  private lastname: string;
  private birthDate: Date;
  private biography: string;

  public static compare(a: Person, b: Person): number {
    // tslint:disable-next-line: no-unused-expression
    a.id < b.id ? -1 : 1;
    return 0;
  }

  public compareTo(person: Person): boolean {
    return this.id === person.id;
  }

  public deserialize(datas: any): Person {
    Object.assign(this, datas);
    return this;
  }
}
