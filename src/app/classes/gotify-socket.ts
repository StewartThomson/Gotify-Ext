import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Message} from "../models/message.model";

export class GotifySocket {
  private connection: WebSocketSubject<any>;
  private token: string;
  private messages: Observable<Message>;

  constructor(public url: string) {
  }

  public OpenConnection(token: string) {
    let url = this.url.replace("http://", "ws://");
    url = url.replace("https://", "wss://");

    this.token = token;
    const newWebSocket = webSocket(url + "/stream?token=" + token);
    this.connection = newWebSocket;
    this.messages = newWebSocket.asObservable().pipe<Message>(
      map<any, Message>((data: string) => {
        return (new Message().deserialize(data).setURL(this.url));
      }),
    );
    return this;
  }

  public GetMessageSubscription() {
    return this.messages;
  }

  public CloseConnection() {
    this.connection.complete();
  }

  public GetToken() {
    return this.token;
  }

  public GetURL() {
    return this.url;
  }
}
