import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {ActivationEnd, Router} from "@angular/router";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {filter, first} from "rxjs/operators";
import {GotifySocket} from "./classes/gotify-socket";
import {FilterService} from "./services/filter.service";
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

  constructor(public sockets: SocketService, private sidenavService: SidenavService, private router: Router,
              public filter: FilterService) {
  }

  public ngOnInit() {
    this.sockets.loadConnections().then(() => {
      // If there's only one server, just go there, otherwise view all
      if (this.sockets.getNumConnections() === 1) {
        this.sockets.$.pipe(first()).subscribe((sock: GotifySocket) => {
          this.router.navigate([`/server/${this.encodeURL(sock.url)}`]);
        });
      } else if (this.sockets.getNumConnections() > 0) {
        this.router.navigate(["/server"]);
      }
    });

    // Whenever a connection is added/removed, we'll want to sync it with the background script
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

    // Getting what the header will be
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
