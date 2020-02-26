import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {merge, Observable, Subject, Subscription} from "rxjs";
import {delay, takeUntil} from "rxjs/operators";
import {GotifySocket} from "../../classes/gotify-socket";
import {BulkMessages} from "../../models/bulk-messages.model";
import {Message} from "../../models/message.model";
import {GotifyAPIService} from "../../services/gotify-api.service";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: "app-message-view",
  styleUrls: ["./message-view.component.scss"],
  templateUrl: "./message-view.component.html",
})
export class MessageViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public url: string;
  public messages: Message[];
  private socketSubscription: Subscription;

  constructor(private route: ActivatedRoute, private gotifyAPI: GotifyAPIService, private sockets: SocketService) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.destroy$.next(true);
      this.messages = [];
      this.url = params.url ? decodeURIComponent(params.url) : "All";
      this.LoadMessages();
      if (this.url === "All") {
        this.sockets.$.pipe(takeUntil(this.destroy$)).subscribe((res: GotifySocket) => {
          res.GetMessageSubscription().subscribe((msg) => {
            this.AddMessage(msg);
          });
        });
      } else {
        this.sockets.getSocket(this.url).GetMessageSubscription().subscribe((msg) => {
          this.AddMessage(msg);
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private AddMessage(...msgs: Message[]) {
    this.messages = this.messages.concat(...msgs);
  }

  private LoadMessages() {
    if (this.url === "All") {
      this.sockets.$.pipe(takeUntil(this.destroy$)).subscribe((res: GotifySocket) => {
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
