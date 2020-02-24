import {Deserializable} from "./deserializable.model";

export class Message implements Deserializable {
  public id: number;
  public appid: number;
  public message: string;
  public title: string;
  public priority: number;
  public date: string;
  public extras: any;
  public url: string;

  public deserialize(input: any): this {
    return Object.assign(this, input);
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }
}
