import {Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {GotifySocket} from "./classes/gotify-socket";
import {SidenavService} from "./services/sidenav.service";
import {SocketService} from "./services/socket.service";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public title = "gotify-ext";
  public currentURL = "";
  @ViewChild("sidenav", {static: false}) public sidenav: MatSidenav;

  constructor(public sockets: SocketService, private sidenavService: SidenavService, private router: Router) {
  }

  public ngOnInit() {
    this.sockets.loadConnections().then(() => {
      if (this.sockets.getNumConnections() > 0) {
        this.router.navigate(["/server"]);
      }
    });

    this.sockets.sockets.subscribe((gotifySockets: GotifySocket[]) => {
      const connections = [];
      for (const socket of gotifySockets) {
        connections.push({
          token: socket.GetToken(),
          url: socket.GetURL(),
        });
      }
      chrome.storage.sync.set({connections});
    });

    chrome.browserAction.setBadgeText({text: ""});
    this.sidenavService.setSidenav(this.sidenav);
  }

  public encodeURL(url: string) {
    return encodeURIComponent(url);
  }
}
