import { Component, OnInit } from '@angular/core';
import { StudentService} from '../../services/student.service';
@Component({
  selector: 'app-studentside-previous-companies',
  templateUrl: './studentside-previous-companies.component.html',
  styleUrls: ['./studentside-previous-companies.component.css']
})
export class StudentsidePreviousCompaniesComponent implements OnInit {

  constructor(
    private studentService : StudentService
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


}
