import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import { map } from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import {Company } from "../model/company";
@Injectable()
export class CompanyService {

  constructor(private http :Http) { }

  companiesList : Company[]=[];
  companiesOnInit:Object[]=[];

  addCompany(year:Number,company:Company){
    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/company/addCompany/'+year,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getaddedCompanies(year){
    return this.http.get('http://localhost:3000/company/getCompanyList/'+year)
    .map((res:Response)=>{

      const companies = res.json().result;
      let companiesList:Company[]=[];

      for(let company of companies){
       companiesList.unshift(company);
      }
      this.companiesList=companiesList;
      return companiesList;
    })
    .catch((err:Response)=>Observable.throw(err.json())); 
  }

  updateCompany(company:Company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/company/updateCompany/'+company._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  updateShowPlacedStudents(company){
    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/company/updateShowPlacedStudents/'+company._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }
  
  updateShowCompany(company){
    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.put('http://localhost:3000/company/updateShowCompany/'+company._id,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  deleteCompany(id){
    return this.http.delete('http://localhost:3000/company/deleteCompany/'+id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  addPlacedStudent(studentID:String,company:Company){

    const body = JSON.stringify(company);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/company/addPlacedStudent/'+studentID,body,{headers:headers})
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

  getPlacedStudentsByBranch(getStudents){

    const body = JSON.stringify(getStudents);
    const headers = new Headers({'content-type':'application/json'});

    return this.http.post('http://localhost:3000/yearlyCompanies/allPlacedStudents/'+getStudents.academicYear,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

}
