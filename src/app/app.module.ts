import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LogInterceptor } from './interceptor/interceptor';
import { FruitesLayoutComponent } from './components/fruitesAndCalrories/fruites-layout/fruites-layout.component';
import { FruiteshomeComponent } from './components/fruitesAndCalrories/fruiteshome/fruiteshome.component';
import { FruiteDetialsComponent } from './components/fruitesAndCalrories/fruite-detials/fruite-detials.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    LayoutComponent,
    FruitesLayoutComponent,
    FruiteshomeComponent,
    FruiteDetialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:LogInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
