import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { FruiteshomeComponent } from './components/fruitesAndCalrories/fruiteshome/fruiteshome.component';
import { FruiteDetialsComponent } from './components/fruitesAndCalrories/fruite-detials/fruite-detials.component';

const routes: Routes = [
  // routes for blog details 
  // {
  //   path: 'home',
  //   component:HomeComponent,
  // },
  // {
  //   path:'post/:id',component:PostsComponent
  // },
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'**',redirectTo:'/home'}

  {
    path:'home',
    component:FruiteshomeComponent
  },
  {
     path:'fruit/:name/:id',
    component:FruiteDetialsComponent
  },
  {
  path:'**',component:FruiteshomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
