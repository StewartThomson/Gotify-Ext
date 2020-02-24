import {Message} from "./message.model";

export class BulkMessages {
  public messages: Message[];
  public paging: {
    limit: number;
    next: string;
    since: number;
    size: number;
  };
}
