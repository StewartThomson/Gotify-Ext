import {map} from "rxjs/operators";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Message} from "./models/message.model";

export class GotifySocket {
  private connection: WebSocketSubject<any>;

  constructor(private url: string) {
  }

  public OpenConnection(token: string) {
    const newWebSocket = webSocket(this.url + "/stream?token=" + token);
    newWebSocket.asObservable().pipe(
      map((data) => new Message().deserialize(data)),
    ).subscribe(
      null,
      (err) => console.log(err),
      () => console.log("complete"),
    );
    this.connection = newWebSocket;
    return this;
  }

  public GetConnection() {
    return this.connection;
  }

  public CloseConnection() {
    this.connection.complete();
  }
}
