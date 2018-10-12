import { Component, OnInit,Input,Inject } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../model/showCompany';
import {StudentService} from '../../services/student.service';
declare let jsPDF;

@Component({
  selector: 'app-previously-placed-students',
  templateUrl: './previously-placed-students.component.html',
  styleUrls: ['./previously-placed-students.component.css']
})
export class PreviouslyPlacedStudentsComponent implements OnInit {

  constructor(
    private companyService : CompanyService,
    private studentService : StudentService
  ) { }

  ngOnInit() {

    this.companiesOnInit();
    
  }

  yearSelected:Number;
  yearSelected1:Number;
  companiesList : Object[]=[];
  studentsList : Object[]=[];
  p:Number = 1;
  toggle:Boolean=true;
  

  addNextYear(year){
    this.yearSelected = parseInt(year)+ 1;
  }

  addNextYear1(year){
    this.yearSelected1 = parseInt(year)+ 1;
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

  toggleForm(){
    this.toggle = !this.toggle;
  }


  showPlacedStudents(form){

    const getStudents : Company = {
      academicYear:form.value.year,
      branch:form.value.branch
    }

    this.companyService.getPlacedStudentsByBranch(getStudents)
    .subscribe(
      data => {
        this.studentsList = data.result
      },
      error => console.log(error)
    )

  }

  updateShowCompany(company){
  
    company.showPlacedStudents = !company.showPlacedStudents;

    this.companyService.updateShowPlacedStudents(company)
    .subscribe(
    data => {
      
      if(data.company.showPlacedStudents){
        this.studentService.showCompanyToStudents(data.company)
        .subscribe(
          data =>console.log(data),
          error => console.log(error)
        )
      }
     else{
        this.studentService.removeShowCompanyToStudents(data.company)
        .subscribe(
          data =>console.log(data),
          error => console.log(error)
        )
      }
    },
    error => console.log(error)
  )
  }

  /*generatePDF(){
    let columns = [
      {title:'Name',dataKey :'firstName' },
      {title:'Company',dataKey:'companyName'},
      {title:'Email',dataKey:'email'}
    ]

    let rows = this.studentsList;

    let doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
    styles: {fillColor: [100, 255, 255]},
    columnStyles: {
    	id: {fillColor: 255}
    },
    margin: {top: 60},
    addPageContent: function(data) {
    	doc.text("Header", 40, 30);
    }
  });
    doc.save('table.pdf');
      
    
  }*/

}
