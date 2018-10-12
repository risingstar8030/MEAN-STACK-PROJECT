import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import {Company } from "../model/company";
@Injectable()
export class ChartserviceService {

  constructor(private http :Http) { }


  getPlacedStudents(year){

     return this.http.get('http://localhost:3000/yearlyCompanies/allPlacedStudents/'+year)
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

}
