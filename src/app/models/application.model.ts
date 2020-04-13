import {Deserializable} from "./deserializable.model";

export class Application implements Deserializable{
  public description: string;
  public id: number;
  public image: string;
  public internal: boolean;
  public name: string;
  public token: string;
  public url: string;

  public deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }
}
