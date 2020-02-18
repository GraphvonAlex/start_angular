export class Person {
  private id: number;
  private name: string;
  private genres: Array<string>;

  public deserialize(datas: any): Person {
    Object.assign(this, datas);
    return this;
  }
}
