import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {OverlayModule} from "@angular/cdk/overlay";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgScrollbarModule} from "ngx-scrollbar";
import {ToastrModule} from "ngx-toastr";
import {AppComponent} from "./app.component";
import {AddViewComponent} from "./components/add-view/add-view.component";
import {BackToTopComponent} from "./components/back-to-top/back-to-top.component";
import {MessageViewComponent} from "./components/message-view/message-view.component";
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import {DateAgoPipe} from "./pipes/date-ago.pipe";
import {OrderByDatePipe} from "./pipes/order-by-date.pipe";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MessageViewComponent,
    AddViewComponent,
    DateAgoPipe,
    OrderByDatePipe,
    OrderByDatePipe,
    BackToTopComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    NgScrollbarModule.withConfig({
      appearance: "compact",
      minThumbSize: 100,
      visibility: "hover",
    }),
    FontAwesomeModule,
    ToastrModule.forRoot({
      countDuplicates: true,
      maxOpened: 5,
      newestOnTop: true,
      positionClass: "toast-bottom-left",
      preventDuplicates: true,
    }),
    MatCheckboxModule,
    MatProgressBarModule,
    OverlayModule,
  ],
  providers: [],
})
export class AppModule {
}
