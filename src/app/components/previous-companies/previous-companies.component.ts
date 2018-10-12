import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../model/showCompany';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-previous-companies',
  templateUrl: './previous-companies.component.html',
  styleUrls: ['./previous-companies.component.css']
})
export class PreviousCompaniesComponent implements OnInit {

  constructor(
    private companyService : CompanyService,
    
  ) { }

  ngOnInit() {
    this.companiesOnInit();
  }


yearSelected:Number;
companiesList : Object[]=[];

  addNextYear(year){
    this.yearSelected = parseInt(year)+ 1;
  }

  showCompanies(form){

    this.companyService.showCompanies(form.value.year)
    .subscribe(
      data =>{
        this.companiesList = data.result;
      },
      error => console.log(error)
    )
    this.yearSelected = null;
    form.resetForm();
  }

  companiesOnInit(){
    this.companiesList =  this.companyService.getCompaniesOnInit();
  }


}
