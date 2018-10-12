import { Component, OnInit } from '@angular/core';
import { StudentService} from "../../services/student.service";
import { Branch} from "../../model/branch";
@Component({
  selector: 'app-add-placed-students',
  templateUrl: './add-placed-students.component.html',
  styleUrls: ['./add-placed-students.component.css']
})
export class AddPlacedStudentsComponent implements OnInit {

  constructor(private studentService : StudentService) { }

  studentsList : Object[]=[];
  branchSelected:String ;
  yearSelected : Number;

  ngOnInit() {

    this.getStudentsOnInit();

  }

  showStudents(form){

    this.branchSelected = form.value.branch;
    this.yearSelected = form.value.year;

    const branchSelected : Branch = {
      branch:form.value.branch,
      year:form.value.year
    }
    
    this.studentService.getStudents(branchSelected)
    .subscribe(
      data => {
        this.studentsList = data;
      },
      error => console.log(error)
    )
  }

  getStudentsOnInit(){
    this.studentsList= this.studentService.getStudentsOnInit();
  }

}
