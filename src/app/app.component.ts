import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {ActivationEnd, Router} from "@angular/router";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {filter} from "rxjs/operators";
import {GotifySocket} from "./classes/gotify-socket";
import {SidenavService} from "./services/sidenav.service";
import {SocketService} from "./services/socket.service";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, AfterViewInit {
  public faCog = faCog;
  public title = "gotify-ext";
  public currentURL = "";
  @ViewChild("sidenav") public sidenav: MatSidenav;
  @ViewChild("mgmt") public mgmtNav: MatSidenav;

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

    // We'll tell the background script that the popup is open
    chrome.runtime.connect();

    this.router.events.pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((e: ActivationEnd) => {
        if (e.snapshot.routeConfig.path.indexOf("server") === 0) {
          this.currentURL = e.snapshot.params.url ? decodeURIComponent(e.snapshot.params.url) : "Gotify - All";
        } else {
          this.currentURL = "";
        }
      });
  }

  public ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.setSidenav(this.mgmtNav, "mgmt");
  }

  public encodeURL(url: string) {
    return encodeURIComponent(url);
  }

  public DeleteCurrentUrl() {
    this.sockets.close(this.currentURL);
    if (this.sockets.getNumConnections() > 0) {
      this.router.navigate(["/server"]);
    } else {
      this.router.navigate(["/add"]);
    }
    this.sidenavService.close("mgmt");
  }
}
