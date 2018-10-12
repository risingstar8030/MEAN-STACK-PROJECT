import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Router} from '@angular/router';
import { Student} from  '../../model/student';
import { Admin } from '../../model/admin';

@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.css']
})
export class StudentsignupComponent implements OnInit {

  studentSelected : boolean = true;
  student : Student = {regid:'',branch:'comp',admyear:2015,oldpassword:'',newpassword:''};
  admin : Admin ={regid:'',department:'comp',oldpassword:'',newpassword:''};

  constructor(private router : Router,
              private studentService : StudentService,
              ) { }

  ngOnInit() {
  }

  onSubmitStudent(form){ 
      if(!form.valid){
        alert('Please fill in all fields');
        this.router.navigateByUrl('/studentsignup');
      }
     else{

      this.studentService.signup(this.student)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigateByUrl('/');
          },
          error => console.log(error)
        )
     }
     form.resetForm();
  }

  onSubmitAdmin(form){
      if(!form.valid){
        alert('Please fill in all fields');
        this.router.navigateByUrl('/studentsignup');
      }
      else{
        
      this.studentService.adminSignup(this.admin)
      .subscribe(
        data =>{ console.log(data);
          this.router.navigateByUrl('/');
        },
        error => console.log(error)
      ) 
      }
      form.resetForm();
  }

  toggleUser(){
      this.studentSelected = !this.studentSelected;
  }

}
