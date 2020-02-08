import {Component, OnInit} from "@angular/core";
import {ServerCollectionService} from "./server-collection.service";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public title = "gotify-ext";

  constructor(private server: ServerCollectionService) {}

  public ngOnInit() {
    const server = this.server.AddServer("ws://localhost:80");
    server.Connect( "CMr-2PYPBsbjJIZ");
  }
}
