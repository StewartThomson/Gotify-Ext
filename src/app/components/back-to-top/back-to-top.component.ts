import {Component, ViewChild} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {faChevronCircleUp} from "@fortawesome/free-solid-svg-icons/faChevronCircleUp";
import {ScrollService} from "../../services/scroll.service";

@Component({
  selector: "app-back-to-top",
  styleUrls: ["./back-to-top.component.scss"],
  templateUrl: "./back-to-top.component.html",
})
export class BackToTopComponent {
  @ViewChild(MatButton) public btn: MatButton;
  public faChevronCircleUp = faChevronCircleUp;

  constructor(private scroll: ScrollService) {
  }

  public GoToTop() {
    this.btn._elementRef.nativeElement.classList.add("hide");
    this.scroll.scrollToTop();
  }

}
