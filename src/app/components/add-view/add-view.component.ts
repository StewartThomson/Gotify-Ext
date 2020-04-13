import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GotifyAPIService} from "../../services/gotify-api.service";
import {SocketService} from "../../services/socket.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: "app-add-view",
  styleUrls: ["./add-view.component.scss"],
  templateUrl: "./add-view.component.html",
})
export class AddViewComponent {
  public static readonly URL_REGEXP = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.?[a-z]{0,5}(:[0-9]{1,5})?(\/.*)?$/;
  public url = new FormControl("", [Validators.required, Validators.pattern(AddViewComponent.URL_REGEXP)]);
  public authType = new FormControl("", [Validators.required]);
  public token = new FormControl("", [Validators.required]);
  public userName = new FormControl("", [Validators.required]);
  public password = new FormControl("", [Validators.required]);
  public appName = new FormControl("", [Validators.required]);
  private tokenFormGroup = new FormGroup({url: this.url, token: this.token});
  private loginFormGroup = new FormGroup({
    appName: this.appName,
    password: this.password,
    url: this.url,
    userName: this.userName,
  });

  constructor(public sockets: SocketService, public gotifyAPI: GotifyAPIService, private alert: AlertService) {
  }

  public getError(formControl) {
    return formControl.hasError("required") ? "You must enter a value" :
      formControl.hasError("pattern") ? "Not a valid URL (remember your http(s)://)" :
        "";
  }

  public AnyFormControlInvalid() {
    if (this.authType.value === "token") {
      return this.tokenFormGroup.invalid;
    } else if (this.authType.value === "login") {
      return this.loginFormGroup.invalid;
    }

    return true;
  }

  public Add() {
    if (this.authType.value === "token") {
      this.sockets.open(this.url.value, this.token.value);
      this.alert.info(`Added ${this.url.value}`);
    } else if (this.authType.value === "login") {
      this.gotifyAPI.GetClientToken(this.url.value, this.userName.value, this.password.value, this.appName.value).subscribe((res) => {
        this.sockets.open(this.url.value, res.token);
        this.alert.info(`Added ${this.url.value}`);
      }, (err) => this.alert.error(err, "Error retrieving client token"));
    }
  }
}
