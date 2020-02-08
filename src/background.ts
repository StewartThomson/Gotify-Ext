import {ServerCollectionService} from "./app/server-collection.service";

chrome.runtime.onInstalled.addListener(() => {
  const ws = new ServerCollectionService();

  const server = ws.AddServer("ws://localhost:80");
  server.Connect("CMr-2PYPBsbjJIZ");

  let unreadCount = 0;
  server.GetConnection().subscribe((msg) => {
    unreadCount++;
    chrome.browserAction.setBadgeText({text: unreadCount.toString()});
  });
});
