import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {GotifySocket} from "./app/classes/gotify-socket";
import {Message} from "./app/models/message.model";
import {SocketService} from "./app/services/socket.service";

const socket = new SocketService();

const destroy$: Subject<boolean> = new Subject<boolean>();
let connections: GotifySocket[];
socket.loadConnections().then(() => {
  // I don't know why, but if I remove this, the counter in the notifications breaks. Maybe I'll look into it some day
  socket.sockets.subscribe((sockets) => {
    connections = sockets;
  });

  let unreadCount = 0;
  let isOpen = false;

  chrome.runtime.onConnect.addListener((port) => {
    isOpen = true;
    chrome.browserAction.setBadgeText({text: ""});
    port.onDisconnect.addListener(() => {
      unreadCount = 0;
      isOpen = false;
    });
  });

  socket.$.pipe(takeUntil(destroy$)).subscribe((gotify: GotifySocket) => {
    gotify.GetMessageSubscription().subscribe((msg: Message) => {
      if (!isOpen) {
        unreadCount++;
        chrome.browserAction.setBadgeText({text: unreadCount.toString()});
        chrome.notifications.create({
          iconUrl: "assets/logo-48.png",
          message: msg.message,
          title: msg.title,
          type: "basic",
        });
      }
    });
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.connections) {
    const newConnections = changes.connections.newValue || [];
    for (const connectionInfo of newConnections) {
      socket.open(connectionInfo.url, connectionInfo.token);
    }
  }
});
