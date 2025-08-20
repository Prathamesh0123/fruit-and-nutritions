import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostData } from '../../model/postData';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  //inject service using DI Dependency injection
  constructor(private postService:PostServiceService,private router:Router){}
  //1 create observable to store data
  postData$!:Observable<PostData[]>;

  // 2 ng onInit to get data every time visits component 
  ngOnInit():void{
    this.postData$ = this.postService.getPost();
  }

  seeBlog(id:number){
    // this.postService.getId.next(id);
    this.router.navigate(['/post',id]);
  }
}
