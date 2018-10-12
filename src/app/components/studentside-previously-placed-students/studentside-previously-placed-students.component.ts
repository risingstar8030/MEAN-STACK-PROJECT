import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Company} from '../../model/showCompany';

@Component({
  selector: 'app-studentside-previously-placed-students',
  templateUrl: './studentside-previously-placed-students.component.html',
  styleUrls: ['./studentside-previously-placed-students.component.css']
})
export class StudentsidePreviouslyPlacedStudentsComponent implements OnInit {

  constructor(
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

    this.studentService.showCompanies(form.value.year)
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
    this.companiesList =  this.studentService.getCompaniesOnInit();
  }

  toggleForm(){
    this.toggle = !this.toggle;
  }

  showPlacedStudents(form){

    const getStudents : Company = {
      academicYear:form.value.year,
      branch:form.value.branch
    }

    this.studentService.getPlacedStudentsByBranch(getStudents)
    .subscribe(
      data => {
        this.studentsList = data.result
      },
      error => console.log(error)
    )

  }


}
