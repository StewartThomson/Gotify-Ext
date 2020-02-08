import {Injectable} from "@angular/core";
import {from, merge, Observable, Subject} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {GotifySocket} from "./gotify-socket";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socketsMap = new Map(); // Hold all registered sockets

  private openSocketSubject = new Subject();

  private closeSocketSubject = new Subject();

  private closeSocket = this.closeSocketSubject.pipe(
    map((url) => {
        this.socketsMap.get(url)
          .CloseConnection();

        return this.socketsMap.delete(url);
      },
    ),
  );

  /**
   * Stream of registered sockets
   */
  public sockets = this.initSocket().pipe(
    merge([this.openSocketSubject, this.closeSocket]),
    map(() => Array.from(this.socketsMap.values())),
  );

  /**
   * Stream of events from *all* open sockets
   * @return {[type]} [description]
   */
  public $ = this.initSocket().pipe(
    merge(this.openSocketSubject), // Subscribe to new sockets as they come through
    mergeMap((socket) => socket.$)) // Connects socket
    .share(); // Only want one instance

  /**
   * Return all previously registered sockets
   */
  public initSocket() {
    return from(this.socketsMap.values());
  }

  public open(url: string, token?: string) {
    this.socketsMap.set(url, (new GotifySocket(url)).OpenConnection(token));

    this.openSocketSubject.next(this.socketsMap.get(url));
  }

  /**
   * Close a socket by key
   */
  public close(url) { // key instead of url?
    this.closeSocketSubject.next(url);
  }
}
