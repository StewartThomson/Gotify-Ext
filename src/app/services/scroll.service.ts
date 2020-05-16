import {Injectable} from "@angular/core";
import {NgScrollbar} from "ngx-scrollbar";

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  private scrollbarRef: NgScrollbar;

  public setScrollBarRef(ref: NgScrollbar) {
    this.scrollbarRef = ref;
  }

  public scrollToBottom() {
    this.scrollbarRef.scrollTo({bottom: 0});
  }
}
