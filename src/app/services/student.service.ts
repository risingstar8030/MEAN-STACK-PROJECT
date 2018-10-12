import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import {Student} from "../model/student";
import { Admin} from '../model/admin';

@Injectable()
export class StudentService {

  constructor(private http :Http) { }

  studentsArray : Object[]=[];
  placedStudents : Object = {};
  upcomingCompany : Object = {};
  companyName:String;
  companiesOnInit:Object[]=[];

  signup(student:Student){
    const body = JSON.stringify(student);
    const headers = new Headers({'content-type':'application/json'});
    
    return this.http.post('http://localhost:3000/student/signup',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }
  
  signin(student:Student){
    const body = JSON.stringify(student);
    const headers = new Headers({'content-type':'application/json'});
    
    return this.http.post('http://localhost:3000/student/signin',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  adminSignin(admin:Admin){
    const body = JSON.stringify(admin);
    const headers = new Headers({'content-type':'application/json'});
    
    return this.http.post('http://localhost:3000/admin/signin',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  adminSignup(admin:Admin){
    const body = JSON.stringify(admin);
    const headers = new Headers({'content-type':'application/json'});
    
    return this.http.post('http://localhost:3000/admin/signup',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }
  
  getStudents(branch){
    const body = JSON.stringify(branch);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/getStudents',body,{headers:headers})
    .map((res:Response) => {
    
      const Students = res.json().students;
      let studentsList :Object[]=[];

      for(let student of Students){
        studentsList.unshift(student);
      }
      this.studentsArray = studentsList;
      return studentsList;
    })
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getStudentsOnInit(){
    return this.studentsArray;
  }

  studentDetail(id){
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/studentDetail/'+id,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  showCompanyToStudents(company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/showCompany',body,{headers:headers})
    .map((res:Response) => {

     this.placedStudents =  res.json().result;
     return this.placedStudents;

    })
    .catch((err:Response)=>Observable.throw(err.json()));

  }

  removeShowCompanyToStudents(company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/removeCompany',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  showUpcomingCompanyToStudents(company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/showUpcomingCompany',body,{headers:headers})
    .map((res:Response) => {

     this.upcomingCompany =  res.json().result;
     return this.upcomingCompany;

    })
    .catch((err:Response)=>Observable.throw(err.json()));

  }

  removeUpcomingCompanyToStudents(company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/student/removeUpcomingCompany',body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }


  getPlacedStudentsOnInit(){

    return this.http.get('http://localhost:3000/student/listOfPlacedStudents')
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getUpcomingCompaniesOnInit(){
    return this.http.get('http://localhost:3000/student/listOfUpcomingCompanies')
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }


  showCompanies(year){

    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/yearlyCompanies/getCompanies/'+year,{headers:headers})
    .map((res:Response) => {
      this.companiesOnInit = res.json().result;
      return res.json();
    })
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getCompaniesOnInit(){
    return this.companiesOnInit;
  }

  getPlacedStudentsByBranch(getStudents){

    const body = JSON.stringify(getStudents);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/yearlyCompanies/allPlacedStudents/'+getStudents.academicYear,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  showCompanyDetails(id){

    return this.http.get('http://localhost:3000/company/getCompanyDetails/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getPlacedStudents(company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/yearlyCompanies/getParticularCompany/'+company.academicYear,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }



}

