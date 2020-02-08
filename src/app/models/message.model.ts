import {Deserializable} from "./deserializable.model";

export class Message implements Deserializable {
  private id: number;
  private appid: number;
  private message: string;
  private title: string;
  private priority: number;
  private date: string;

  public deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
