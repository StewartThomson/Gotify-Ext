import {GotifySocket} from "./app/classes/gotify-socket";
import {SocketService} from "./app/services/socket.service";

chrome.runtime.onInstalled.addListener(() => {
  const socket = new SocketService();

  socket.loadConnections().then(() => {

    chrome.storage.onChanged.addListener((changes, namespace) => {
      const connections = changes.connections.newValue;
      for (const connectionInfo of connections) {
        socket.open(connectionInfo.url, connectionInfo.token);
      }
    });
  });

  let unreadCount = 0;
  socket.initSocket().subscribe((gotify: GotifySocket) => gotify.GetMessageSubscription().subscribe((_) => {
    unreadCount++;
    chrome.browserAction.setBadgeText({text: unreadCount.toString()});
  }));
});
