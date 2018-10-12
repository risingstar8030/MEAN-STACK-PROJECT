import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from "../../services/authservice.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthserviceService) { }

  ngOnInit() {

    this.getStudentDetails();
  }

  user ={
    name:'',
    regId:'',
    email:'',
    dept:''
  }

  getStudentDetails(){

    this.authService.getUserDetails()
    .subscribe(
      data =>{
        if(data.title =="Student"){
          this.user.name = `${data.user.firstName} ${data.user.middleName} ${data.user.lastName}`.toUpperCase();
          this.user.regId = data.user.regid;
          this.user.email = data.user.email;
          this.user.dept = data.user.branch.toUpperCase();
        }
        else{
          this.user.name = `${data.user.firstname} ${data.user.lastname}`.toUpperCase();
          this.user.regId = data.user.regid;
          this.user.email = data.user.email;
          this.user.dept = data.user.department.toUpperCase();
        }
        
      },
      error => console.log(error)

    )

  }

}
