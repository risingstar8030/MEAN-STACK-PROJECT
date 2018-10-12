import { Component, OnInit } from '@angular/core';
import { StudentService} from '../../services/student.service';
@Component({
  selector: 'app-studentside-upcoming-company',
  templateUrl: './studentside-upcoming-company.component.html',
  styleUrls: ['./studentside-upcoming-company.component.css']
})
export class StudentsideUpcomingCompanyComponent implements OnInit {

  constructor(
    private studentService : StudentService
  ) { }

  ngOnInit() {

    this.UpcomingCompanies();

  }

  upcomingCompanies : Object[]=[];


  UpcomingCompanies(){
    this.studentService.getUpcomingCompaniesOnInit()
    .subscribe(
      data => {
       this.upcomingCompanies = data.result;
      },
      error => console.log(error)
    )
  }

}
