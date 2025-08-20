import { Component,OnInit } from '@angular/core';
import { FruitesServiceService } from 'src/app/services/fruitesAndCalroiesService/fruites-service.service';
import { FruitesData } from 'src/app/model/fruitesData';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fruiteshome',
  templateUrl: './fruiteshome.component.html',
  styleUrls: ['./fruiteshome.component.css']
})
export class FruiteshomeComponent implements OnInit {
  constructor(private fruiteService:FruitesServiceService,private route:Router){}
  // searchTerm:string = '';
  // fruitesData$ = new Observable<FruitesData[]>;
  filterData$ = new Observable<FruitesData[]>;
  allFruits$ = this.fruiteService.getFruites();
  showloader: boolean = false;

  searchControl = new FormControl<string>('',{nonNullable:true}); // hold string coming from UI
  ngOnInit(): void {
    // this.fruitesData$ = this.fruiteService.getFruites();
    // this.filterData$ = this.fruitesData$;

    const searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith(''),
    )
    // console.log(searchTerm$);//anonymousSubject
    this.filterData$ = combineLatest([this.allFruits$,searchTerm$]).pipe(
      map(([fruits,term])=>{
        return fruits.filter(fruit =>
          fruit.name.toLowerCase().includes(term.toLowerCase())
        )
      })
    )
}

// use onInit and combineLatest operator
// searchFruites(){
//   this.filterData$ = this.fruitesData$.pipe(
//     map(fruits =>{
//       return fruits.filter(fruit => 
//         fruit.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//       )
//     })
//   );
// }

  addFruite(){
    const term = this.searchControl.value;
    if(!term){
      return alert('enter fruit name');
    }
    this.showloader = true;
    this.fruiteService.addFruite(term).subscribe({
      next:(res)=>{
        console.log('new fruite fetched!!!',res);
        this.showloader = false;
        this.getFruitDetail(res);
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
        alert('fruit not found!!');
      }
    })
  }

  getFruitDetail(fruit:FruitesData){
    this.route.navigate(['fruit',fruit.name,fruit.id]);
  }

}
