import {Injectable} from "@angular/core";
import {NgScrollbar} from "ngx-scrollbar";
import {BackToTopService} from "./back-to-top.service";

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  private static readonly BACK_TO_TOP_THRESHOLD = 200;
  private scrollbarRef: NgScrollbar;

  constructor(private backToTop: BackToTopService) {
  }

  public setScrollBarRef(ref: NgScrollbar) {
    this.scrollbarRef = ref;
    this.scrollbarRef.scrolled.subscribe((e) => {
      if (e.target.scrollTop > ScrollService.BACK_TO_TOP_THRESHOLD) {
        this.backToTop.show();
      } else {
        this.backToTop.hide();
      }
    });
  }

  public scrollToBottom() {
    this.scrollbarRef.scrollTo({bottom: 0});
  }

  public scrollToTop() {
    this.scrollbarRef.scrollTo({top: 0});
  }
}
