import { Component, OnInit } from '@angular/core';
import { AuthserviceService} from '../../services/authservice.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../style3.css']
})
export class HomeComponent implements OnInit {

  year:any = new Date().getFullYear();

  constructor(private authService : AuthserviceService,
              private router : Router) { }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }



  ngOnInit() {

  }


  
}
