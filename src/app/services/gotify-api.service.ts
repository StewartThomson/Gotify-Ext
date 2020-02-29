import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {BulkMessages} from "../models/bulk-messages.model";
import {ClientResponse} from "../models/client-response.model";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: "root",
})
export class GotifyAPIService {
  constructor(private http: HttpClient) {
  }

  public GetClientToken(url: string, username: string, password: string, appName: string) {
    return this.http.post<ClientResponse>(url + "/client", {
      name: appName,
    }, {
      headers: new HttpHeaders({
        Authorization: "basic " + btoa(`${username}:${password}`),
      }),
    });
  }

  public GetMessages(url: string, token: string, since = Number.MAX_SAFE_INTEGER) {
    return this.http.get<BulkMessages>(`${url}/message?since=${since}&token=${token}`).pipe(
      map<BulkMessages, BulkMessages>(
        (msgs: BulkMessages) => {
          msgs.messages = msgs.messages.map<Message>((element) => {
            element = new Message().deserialize(element);
            return element.setURL(url);
          });
          return msgs;
        },
      ),
    );
  }

  public DeleteMessage(url: string, token: string, id: number) {
    return this.http.delete(`${url}/message/${id}?token=${token}`);
  }

  public DeleteAllMessages(url: string, token: string) {
    return this.http.delete(`${url}/message?token=${token}`);
  }
}
