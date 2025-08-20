import { Component , OnInit} from '@angular/core';
import { FruitesData } from 'src/app/model/fruitesData';
import { Observable } from 'rxjs';
import { FruitesServiceService } from 'src/app/services/fruitesAndCalroiesService/fruites-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-fruite-detials',
  templateUrl: './fruite-detials.component.html',
  styleUrls: ['./fruite-detials.component.css']
})
export class FruiteDetialsComponent implements OnInit {

  constructor(private fruitService:FruitesServiceService,private route:Router,private activeRouteService:ActivatedRoute){}
  fruitData$!:Observable<FruitesData>;

  ngOnInit(): void {
    const name = this.activeRouteService.snapshot.paramMap.get('name');
    const id = Number(this.activeRouteService.snapshot.paramMap.get('id'));

    console.log('Name:', name, 'ID:', id);

    if (!isNaN(id)) {
      this.fruitData$ = this.fruitService.getFruitById(id);
    }
  }

  gotoHome(){
    this.route.navigate(['/home']);
  }

}
 