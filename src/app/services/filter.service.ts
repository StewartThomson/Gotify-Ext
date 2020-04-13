import {Injectable} from "@angular/core";
import { ActivationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {Application} from "../models/application.model";
import {AlertService} from "./alert.service";
import {GotifyAPIService} from "./gotify-api.service";
import {SocketService} from "./socket.service";
import {from, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public applicationFiltered = new Map<Application, boolean>();
  public changed$ = new Subject();

  constructor(private sockets: SocketService, private router: Router, private gotifyAPI: GotifyAPIService,
              private alert: AlertService) {
    this.router.events.pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((e: ActivationEnd) => {
        const params = e.snapshot.params;
        const url = params.url ? decodeURIComponent(params.url) : "All";
        this.applicationFiltered = new Map<Application, boolean>();
        // For now, only doing filtering in single server view
        if (url !== "All") {
          const socket = this.sockets.getSocket(url);
          this.gotifyAPI.GetApplications(socket.GetURL(), socket.GetToken()).subscribe((apps: Application[]) => {
            for (const app of apps) {
              this.applicationFiltered.set(app, true);
            }
          }, (err) => this.alert.error(err, "Unable to get applications"));
        } else {
          this.applicationFiltered.clear();
        }
      });
  }

  public initObservable() {
    return from(this.applicationFiltered.entries());
  }

  public toggle(key: Application) {
    this.applicationFiltered.set(key, !this.applicationFiltered.get(key));
    this.changed$.next();
  }
}
