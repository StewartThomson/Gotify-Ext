import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {GotifySocket} from "../../classes/gotify-socket";
import {Message} from "../../models/message.model";
import {GotifyAPIService} from "../../services/gotify-api.service";
import {SocketService} from "../../services/socket.service";
import {BulkMessages} from "../../models/bulk-messages.model";

@Component({
  selector: "app-message-view",
  styleUrls: ["./message-view.component.scss"],
  templateUrl: "./message-view.component.html",
})
export class MessageViewComponent implements OnInit {
  public url: string;
  public messages: Message[] = [];

  constructor(private route: ActivatedRoute, private gotifyAPI: GotifyAPIService, private sockets: SocketService) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.url = params.url ? params.url : "All";
      this.LoadMessages();
      if (this.url === "All") {
        this.sockets.$.subscribe((res: GotifySocket) => {
          res.GetMessageSubscription().subscribe((msg: Message) => {
            this.AddMessage(msg);
          });
        });
      } else {
        this.sockets.getSocket(this.url).GetMessageSubscription().subscribe((msg: Message) => {
          this.AddMessage(msg);
        });
      }
    });
  }

  private AddMessage(...msg: Message[]) {
    this.messages.push(...msg);
  }

  private LoadMessages() {
    if (this.url === "All") {
      this.sockets.$.subscribe((res: GotifySocket) => {
        this.gotifyAPI.GetMessages(res.GetURL(), res.GetToken()).subscribe((msgs: BulkMessages) => {
          this.AddMessage(...msgs.messages);
        });
      });
    } else {
      this.gotifyAPI.GetMessages(this.url, this.sockets.getSocket(this.url).GetToken()).subscribe((msgs: BulkMessages) => {
        this.AddMessage(...msgs.messages);
      });
    }
  }
}
