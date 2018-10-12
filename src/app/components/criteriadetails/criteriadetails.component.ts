import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../model/showCompany';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-criteriadetails',
  templateUrl: './criteriadetails.component.html',
  styleUrls: ['./criteriadetails.component.css']
})
export class CriteriadetailsComponent implements OnInit {

  constructor(
    private companyService : CompanyService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.companyDetails();
  
  }

  id:String;
  company:Object = {
    companyId:'',
    companyName:'',
    website:'',
    package:0,
    date:'',
    day:'',criteria:0,backlog:'',
    activity1:'',activity2:'',activity3:'',
    venue1:'',venue2:'',venue3:'',
    skills:'',
    comp:false,it:false,entc:false
  }

  companyDetails(){
    this.companyService.showCompanyDetails(this.id)
    .subscribe(
      data =>{
        this.company['companyId'] = data.company._id;
       this.company['companyName'] = data.company.companyName;
       this.company['website'] = data.company.website;
       this.company['package'] = data.company.ctc;
       this.company['date'] = data.company.date;
       this.company['day']= data.company.day;
       this.company['activity1']= data.company.activity1;
       this.company['activity2']= data.company.activity2;
       this.company['activity3']= data.company.activity3;
       this.company['venue1']= data.company.venue1;
       this.company['venue2']= data.company.venue2;
       this.company['venue3']= data.company.venue3;
       this.company['skills']= data.company.skills;
       this.company['comp']= data.company.comp;
       this.company['it']= data.company.it;
       this.company['entc']= data.company.entc;
       this.company['criteria']= data.company.criteria;
       this.company['backlog']= data.company.backlog;
      },
      error => console.log(error)
    );
   
  }


}
