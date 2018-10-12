import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { Company} from '../../model/showCompany';
@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css']
})
export class CompanydetailsComponent implements OnInit {

  constructor(
    private companyService : CompanyService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.companyDetails();
    this.getStudents();    
  }

  id:String;
  academicYear:String='';
  placedStudentsList : Object[]=[];
  
  company:Object = {
    companyId:'',
    companyName:'',
    website:'',
    package:0,
    date:'',
    year:''
  
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
       this.company['year']= data.company.academicYear.substr(0,4);
      },
      error => console.log(error)
    );
   
  }

  getStudents(){

    this.companyService.showCompanyDetails(this.id)
    .subscribe(
      data =>{
        const test : Company = {
          id:data.company._id,
          academicYear:data.company.academicYear.substr(0,4)
        }
          // get placed students of that company
            this.companyService.getPlacedStudents(test)
            .subscribe(
              data =>{
                this.placedStudentsList = data.result;
              },
              error => console.log(error)
            )
      },
      error => console.log(error)
    );
  }

  
}
