import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AlertService {

  constructor(private toastr: ToastrService) {
  }

  public error(err: Error, msg = "") {
    if (msg === "") {
      msg = err.message || "Unknown error has occurred";
    }
    console.error(err);
    this.toastr.error(msg, "Error");
  }

  public info(msg: string) {
    this.toastr.info(msg);
  }
}
