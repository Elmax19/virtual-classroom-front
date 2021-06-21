import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent} from './login/login.component';
import {MembersComponent} from './members/members.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {Routes, RouterModule} from "@angular/router";
import { AppComponentComponent } from './app-component/app-component.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'members', component: MembersComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    MembersComponent,
    AppComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponentComponent]
})
export class AppModule {
}
