import { Component, OnInit } from '@angular/core';
import { placedStudent } from '../../model/studentPlaced';
import {StudentService} from '../../services/student.service';
@Component({
  selector: 'app-homestudent',
  templateUrl: './homestudent.component.html',
  styleUrls: ['./homestudent.component.css']
})
export class HomestudentComponent implements OnInit {

  
  constructor(
    private studentService : StudentService
  ) { }

  ngOnInit() {

    this.PlacedStudents();

  }

  placedStudents : Object[] = [];
  company : Object[]=[];
  companyName:String;
  p : Number = 1;
  
  PlacedStudents(){

   this.studentService.getPlacedStudentsOnInit()
   .subscribe(
     data => {
       this.placedStudents = data.result;
     },
     error => console.log(error)
   )
  }

}
