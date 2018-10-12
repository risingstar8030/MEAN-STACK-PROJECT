import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthserviceService {

  constructor(private http : Http) { }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }

  getUserDetails(){

    const userId = localStorage.getItem('userId');

    return this.http.get("http://localhost:3000/admin/loggedInUser/"+userId)
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }



}
