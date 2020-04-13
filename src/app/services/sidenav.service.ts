import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
@Injectable({
  providedIn: "root",
})
export class SidenavService {
  private sideNavs = new Map<string, MatSidenav>();

  public setSidenav(sidenav: MatSidenav, pos = "default") {
    this.sideNavs.set(pos, sidenav);
  }

  public open(pos = "default") {
    return this.sideNavs.get(pos).open();
  }

  public close(pos = "default") {
    return this.sideNavs.get(pos).close();
  }

  public toggle(pos = "default"): void {
    this.sideNavs.get(pos).toggle();
  }
}
