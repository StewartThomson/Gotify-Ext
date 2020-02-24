import {Injectable} from "@angular/core";
import {from, merge, Observable, Subject} from "rxjs";
import {map, mergeMap, share} from "rxjs/operators";
import {GotifySocket} from "../classes/gotify-socket";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socketsMap = new Map<string, GotifySocket>(); // Hold all registered sockets

  private openSocketSubject = new Subject();

  private closeSocketSubject = new Subject();

  private closeSocket = this.closeSocketSubject.pipe(
    map((url: string) => {
        this.socketsMap.get(url)
          .CloseConnection();

        return this.socketsMap.delete(url);
      },
    ),
  );

  /**
   * Stream of registered sockets
   */
  public sockets = merge(this.initSocket(), this.openSocketSubject, this.closeSocket).pipe(map(() => Array.from(this.socketsMap.values())));

  public $ = merge(this.initSocket(), this.openSocketSubject).pipe(share()); // Only want one instance

  /**
   * Return all previously registered sockets
   */
  public initSocket() {
    return from(this.socketsMap.values());
  }

  public open(url: string, token: string) {
    this.socketsMap.set(url, (new GotifySocket(url)).OpenConnection(token));

    this.openSocketSubject.next(this.socketsMap.get(url));
  }

  /**
   * Close a socket by key
   */
  public close(url) {
    this.closeSocketSubject.next(url);
  }

  public loadConnections() {
    return new Promise((resolve) => {
      chrome.storage.sync.get("connections", (res) => {
        if ("connections" in res) {
          const connections = res.connections;
          for (const connectionInfo of connections) {
            this.open(connectionInfo.url, connectionInfo.token);
          }
        }
        resolve();
      });
    });
  }

  public getSocket(url: string): GotifySocket {
    return this.socketsMap.get(url);
  }

  public getNumConnections() {
    return this.socketsMap.size;
  }
}
