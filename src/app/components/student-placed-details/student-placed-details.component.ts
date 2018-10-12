import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import {StudentService} from "../../services/student.service";
import { Company } from "../../model/company";
import { CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-student-placed-details',
  templateUrl: './student-placed-details.component.html',
  styleUrls: ['./student-placed-details.component.css']
})
export class StudentPlacedDetailsComponent implements OnInit {

  constructor(
    private router : Router,
    private route  : ActivatedRoute,
    private companyService : CompanyService,
    private studentService : StudentService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.studentService.studentDetail(this.id)
    .subscribe(
      data =>{
        this.student.firstName = data.student.firstName;
        this.student.lastName = data.student.lastName;
        this.student.regid = data.student.regid;
        this.student.email = data.student.email;
      },
      error => console.log(error)
    );


    this.companyService.getaddedCompanies(this.academicYear)
    .subscribe(companyList => {
      this.companiesAdded = companyList
    },
    error => console.log(error)
    );

    this.isStudentPlaced();
  }

  isStudentPlaced(){

     this.studentService.studentDetail(this.id)
    .subscribe(
      data => {
        this.isPlaced = data.student.placed;
        if(this.isPlaced){
          this.placedCompanyName = data.student.company.companyName;
        }},
      error => console.log(error)
    );
  }
  test : String;
  placedCompanyName : String;
  companiesAdded :Company[]=[];
  companyName : String;
  companyCtc : Number;
  company : Company;
  isPlaced : Boolean;
  p:Number = 1;
  academicYear = new Date().getFullYear();
  id : String;
  yearSelected : Number;
  student  = {
    firstName:'',
    lastName:'',
    regid:'',
    email:''
  }

  addYear(form){
    this.academicYear = form.value.year;
  }

  addNextYear1(year){
    this.yearSelected = parseInt(year)+ 1;
  }

  addCompany(company){
    this.company = company;
    this.companyName = company.companyName;
    this.companyCtc = company.ctc;
  }
  addStudentToCompany(form){
      this.companyService.addPlacedStudent(this.id,this.company)
      .subscribe(
        data => {console.log(data);
        this.isStudentPlaced();
        },
        error => console.log(error)
      );
      form.resetForm();
  }

  

}
