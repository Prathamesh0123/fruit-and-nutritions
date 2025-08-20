import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostData } from '../model/postData';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }
  // getId = new Subject<number>;
  private userDataBehaviorSubject = new BehaviorSubject<PostData[]>([]);

  userDataObservable$: Observable<PostData[]> = this.userDataBehaviorSubject.asObservable();

  getPost():Observable<PostData[]>{

    if(this.userDataBehaviorSubject.getValue().length == 0){
      console.log('No catche fetching new Post from Api....');
      this.http.get<PostData[]>(`https://jsonplaceholder.typicode.com/posts?_limit=10`).subscribe({
        next:(data)=>{
          this.userDataBehaviorSubject.next(data);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }else{
      console.log('catche found fetching existed post...');
    }
    return this.userDataObservable$;
  }

  getPostById(id:number):Observable<PostData>{
    const getPosts = this.userDataBehaviorSubject.getValue();   
    const postCatche = getPosts.find(postId => postId.id == id);

    if(postCatche){
      console.log(`Catche exist for id ${id} fetched existing post`);
      return of(postCatche);
    }else{
      console.log(`No Catche found for id ${id} fetching from Api...`);
      return  this.http.get<PostData>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }
  }

}
