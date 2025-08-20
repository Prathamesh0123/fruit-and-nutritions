import { Injectable } from '@angular/core';
import { FruitesData } from 'src/app/model/fruitesData';
import { BehaviorSubject, EMPTY, find, map, Observable, of, retry, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FruitesServiceService {

  constructor(private http: HttpClient) { }

  //to handle data coming from of array of object stroting data in memory avoding api call untill refresh
  fruitesDataBehaviourSubject = new BehaviorSubject<FruitesData[]>([]);
  fruitesObservable$ = this.fruitesDataBehaviourSubject.asObservable();

  getFruites(): Observable<FruitesData[]> {
    if (this.fruitesDataBehaviourSubject.getValue().length > 0) {
      console.log('Cache found, no API call made.');
      return this.fruitesObservable$;
    }

    console.log('No cache found, making new API calls...');

    return this.http.get<FruitesData[]>(`http://localhost:3000/api/fruites`).pipe(
      // This is the main "assembly line"
      switchMap((fruits: FruitesData[]) => {
        if (fruits.length === 0) {
          return of([]);
        }
        const fruitNames = fruits.map(fruit => fruit.name);//this will return the new array contains only names

        return this.http.post<FruitesData[]>(`http://localhost:3000/api/getimages`, { names: fruitNames,fruitesData:fruits }).pipe(
          // It will receive the final combined data that comes out of the switchMap.
          tap(combinedData => {
            console.log('Data combined. Caching result...');
            this.fruitesDataBehaviourSubject.next(combinedData);
          })
        );
      }),
    );
  }


  addFruite(name:string):Observable<FruitesData>{
    return this.http.get<FruitesData>(`http://localhost:3000/api/fruites?name=${name}`).pipe(
      switchMap((fruit:FruitesData)=>{
        if(!fruit){
          return EMPTY;
        }
        return this.http.post<FruitesData>(`http://localhost:3000/api/getimages`,{fruitesData:fruit,name:fruit.name}).pipe(
          tap(newFruit => {
            const currentFruites = this.fruitesDataBehaviourSubject.getValue()
            const updateFruites = [...currentFruites,newFruit];
            this.fruitesDataBehaviourSubject.next(updateFruites);
            console.log(`Cache updated with ${newFruit.name}`);
          })
        )
      })
    )
  }

  //the reason iam not handing api recall reduce is i wanto fecth new fruit from 
  //api every time i click on fruites all tho i alredy have fruites data i can simple
  //take index and in prexisted fruitdata by using map i retun that object and remove 
  //whole api call even but just to undestand the concept of Router paramter in angular 
  //iam passing id of fruit in url and in service i recive that id and make api call
  //and i get data another solution keeping the Router parameter i use id to fetch current 
  //fruit from existed fruit data its aowsome
  getFruitById(id: number): Observable<FruitesData> {
    if(this.fruitesDataBehaviourSubject.getValue().length == 0){
      console.log(`no catche found for ${id} fetching from Api`);
      return this.http.get<FruitesData>(`http://localhost:3000/api/getfruit?id=${id}`);
    }
    console.log(`catche found for ${id}...`);
    return this.fruitesDataBehaviourSubject.pipe(
      map((data)=>{
        const fruit = data.find(fruit => fruit.id == id)
        if(!fruit){
          // return throwError(() => new Error('no data for current fruit')); wrap in observable and return 
          //simple javascript throwError this error never cought it will die in end coz i not handled in here 
          //its just place holder that catch if find method return undefine data that does't exist even that would 
          //not happend as long as i pass corrct id and fruitData my main array alredy have data i can do that but 
          //don't need to do coz i alredy have array iam fetching data from that array so its 100% that that can't be
          //undefine... for sure 
          throw new Error('no data for current fruit'); 
        }
        // return of(fruit);// wrap data in observable return as observable
        return fruit; // in Map return plain object not Observable 
      })
    );
    
  }


}