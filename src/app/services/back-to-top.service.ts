import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {Injectable} from "@angular/core";
import {BackToTopComponent} from "../components/back-to-top/back-to-top.component";

@Injectable({
  providedIn: "root",
})
export class BackToTopService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create();
    this.overlayRef.updatePositionStrategy(
      this.overlay.position().flexibleConnectedTo({x: 0, y: 0, width: 800, height: 500})
        .withPositions([
            {
              originX: "end",
              originY: "bottom",
              overlayX: "end",
              overlayY: "bottom",
            },
          ],
        ),
    );
  }

  public show() {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new ComponentPortal(BackToTopComponent));
    }
  }

  public hide() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
