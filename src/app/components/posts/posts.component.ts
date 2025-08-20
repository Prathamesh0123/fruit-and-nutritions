import { Component, OnInit } from '@angular/core';
import { PostData } from 'src/app/model/postData';
import { Observable } from 'rxjs';
import { PostServiceService } from 'src/app/services/post-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private PostService:PostServiceService,private router:Router, private route: ActivatedRoute){}
  postData$!:Observable<PostData>;
 

  ngOnInit(): void {
     const id = Number(this.route.snapshot.paramMap.get('id'));
     if(id){
      this.postData$ = this.PostService.getPostById(id);
     }
  }

  goToHome(){
    this.router.navigate(['/home']);
  }


}
