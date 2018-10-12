import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../model/student';
import { Admin} from '../../model/admin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-studentsignin',
  templateUrl: './studentsignin.component.html',
  styleUrls: ['./studentsignin.component.css']
})
export class StudentsigninComponent implements OnInit {

  studentSelected : boolean = true;

  constructor(private studentService :StudentService,
              private router : Router) { }

  student : Student = {regid:'',newpassword:''}
  admin : Admin ={regid:'',newpassword:''}

  onSubmitStudent({value,valid}){
    if(!valid){
      alert("please fill in all fields");
      this.router.navigateByUrl('/');
    }
   else{

    this.studentService.signin(this.student)
    .subscribe( data =>{
            localStorage.setItem('token',data.token);
            localStorage.setItem('userId',data.userId);
            console.log(data);
       this.router.navigateByUrl('/navbar');
    },
    error => console.log(error))
   }

  }

  onSubmitAdmin({value,valid}){
    if(!valid){
      alert("please fill in all fields");
      this.router.navigateByUrl('/adminnavbar');
    }
    else{
    
    this.studentService.adminSignin(this.admin)
    .subscribe( data =>{
            localStorage.setItem('token',data.token);
            localStorage.setItem('userId',data.userId);
       this.router.navigateByUrl('/adminnavbar');
    },
    error => console.log(error))
    }
  }



  toggleUser(){
    this.studentSelected = !this.studentSelected;
  }

  ngOnInit() {
  }

}
