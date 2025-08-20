import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpRequest , HttpHandler , HttpEvent , HttpResponse} from '@angular/common/http';
import { catchError, Observable , tap, throwError} from 'rxjs'
export class LogInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

        console.log(`outgoing request ---> ${req.url}`);
        // the next is handler pass request to nextHnadler or nextInterceptor if we have its call chaining and come back in same flow from last interceptor 
        // if we don't have next interceptor the request goes to server 
        return next.handle(req).pipe(
            //tap is run two times and all operator inside the pipe
            //one when the request is made and there is no httpResponse and error
            //second when server responded and that time httpResponse come or either the error come but somthin come
            //so it run atleast two times...
            tap((data:HttpEvent<any>)=>{
                console.log('httpEvents -> ',data);
                if(data instanceof HttpResponse){
                    console.log(`<--- incoming req ${data.url}`);
                }
            }),
            catchError((err:HttpErrorResponse)=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status == 404){
                        console.log(`data not found ${err.message}`);
                    }else if(err.status == 500){
                        console.log(`server is down ${err.message}`)
                    }
                }
                return throwError(()=> err);
            })
        )
    }
}