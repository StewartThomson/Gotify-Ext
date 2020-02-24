import {GotifySocket} from "./app/classes/gotify-socket";
import {SocketService} from "./app/services/socket.service";

console.log("hello");
chrome.runtime.onInstalled.addListener(() => {
  const socket = new SocketService();

  socket.loadConnections().then(() => {

    chrome.storage.onChanged.addListener((changes, namespace) => {
      const connections = changes.connections.newValue;
      for (const connectionInfo of connections) {

      }
    });
  });

  // socket.open("ws://localhost:81", "Cl_ZB0SfPi2IMQ8");
  //
  // let unreadCount = 0;
  // socket.$.subscribe((gotify) => gotify.GetConnection().subscribe((msg) => {
  //   unreadCount++;
  //   chrome.browserAction.setBadgeText({text: unreadCount.toString()});
  // }));
});
