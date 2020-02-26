import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AddViewComponent } from "./components/add-view/add-view.component";
import { MessageViewComponent } from "./components/message-view/message-view.component";
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import { DateAgoPipe } from "./pipes/date-ago.pipe";
import { OrderByDatePipe } from "./pipes/order-by-date.pipe";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MessageViewComponent,
    AddViewComponent,
    DateAgoPipe,
    OrderByDatePipe,
    OrderByDatePipe,
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
  ],
  providers: [],
})
export class AppModule { }
