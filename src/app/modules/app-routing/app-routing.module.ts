import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddViewComponent} from "../../components/add-view/add-view.component";
import {MessageViewComponent} from "../../components/message-view/message-view.component";

const routes: Routes = [
  {path: "", redirectTo: "/add", pathMatch: "full"},
  {path: "server", component: MessageViewComponent},
  {path: "server/:url", component: MessageViewComponent},
  {path: "add", component: AddViewComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {
}
