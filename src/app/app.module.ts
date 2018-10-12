import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {MessageService} from './services/message.service';
import {StudentService} from './services/student.service';
import { CompanyService} from "./services/company.service";
import { AuthserviceService } from './services/authservice.service';
import {ChartserviceService} from './services/chartservice.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { StudentsigninComponent } from './components/studentsignin/studentsignin.component';
import { StudentsignupComponent } from './components/studentsignup/studentsignup.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessageComponent } from './components/message/message.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomestudentComponent } from './components/homestudent/homestudent.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdminupcomingcompanyComponent } from './components/adminupcomingcompany/adminupcomingcompany.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AddPlacedStudentsComponent } from './components/add-placed-students/add-placed-students.component';
import { StudentPlacedDetailsComponent } from './components/student-placed-details/student-placed-details.component';
import { PreviouslyPlacedStudentsComponent } from './components/previously-placed-students/previously-placed-students.component';
import {CompanydetailsComponent} from './components/companydetails/companydetails.component';
import { ChartComponent } from './components/chart/chart.component';
import { PreviousCompaniesComponent } from './components/previous-companies/previous-companies.component';
import { CriteriadetailsComponent } from './components/criteriadetails/criteriadetails.component';
import { StudentsidePreviouslyPlacedStudentsComponent } from './components/studentside-previously-placed-students/studentside-previously-placed-students.component';
import { StudentsideCompanyComponent } from './components/studentside-company/studentside-company.component';
import { StudentsidePreviousCompaniesComponent } from './components/studentside-previous-companies/studentside-previous-companies.component';
import {StudentsideCompanyDetailsComponent} from './components/studentside-company-details/studentside-company-details.component';
import { StudentsideUpcomingCompanyComponent } from './components/studentside-upcoming-company/studentside-upcoming-company.component';

const appRoutes : Routes = [
  {path:'',component:StudentsigninComponent},
//  {path:'profile',component:ProfileComponent},
  {path:'studentsignup',component:StudentsignupComponent},
  {path:'adminsignin',component:AdminsigninComponent},
  {path:'adminsignup',component:AdminsignupComponent }, 
  {path:'contact',component:ContactComponent },
  //Student
  {path:'navbar',component:NavbarComponent,
  children:[  //Student Side child routes
    {path:'',component:HomestudentComponent},
    {path:'message',component:MessageComponent},
    {path:'profile',component:ProfileComponent},
    {path:'company',component:StudentsidePreviousCompaniesComponent},
    {path:'placedStudents',component:StudentsidePreviouslyPlacedStudentsComponent},
    {path:'chart',component:ChartComponent},
    {path:'upcomingCompany',component:StudentsideUpcomingCompanyComponent},
    {path:'studentsPlacedInCompany/:id',component:StudentsideCompanyComponent},
    {path:'companyDetails/:id',component:StudentsideCompanyDetailsComponent},
    
]},//Admin
  {path:'adminnavbar',component: AdminnavbarComponent,
    children:[ // Admin Side child routes
      {path:'',component:AdminhomeComponent},
      {path:'upcomingcompany',component:AdminupcomingcompanyComponent},
      {path:'placedStudents',component:AddPlacedStudentsComponent},
      {path:'profile',component:ProfileComponent},
      {path:'student/:id',component:StudentPlacedDetailsComponent},
      {path:'company/:id',component:CompanydetailsComponent},
      {path:'companyCriteria/:id',component:CriteriadetailsComponent},
      {path:'previouslyPlacedStudents',component:PreviouslyPlacedStudentsComponent},
      {path:'chart',component:ChartComponent},
      {path:'previousCompanies',component: PreviousCompaniesComponent},
  ]}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminsigninComponent,
    AdminsignupComponent,
    StudentsigninComponent,
    StudentsignupComponent,
    ContactComponent,
    MessageComponent,
    ProfileComponent,
    NavbarComponent,
    AdminnavbarComponent,
    HomestudentComponent,
    AdminupcomingcompanyComponent,
    AdminhomeComponent,PreviousCompaniesComponent,
    AddPlacedStudentsComponent, StudentsideUpcomingCompanyComponent,
    StudentPlacedDetailsComponent,StudentsideCompanyDetailsComponent,
    PreviouslyPlacedStudentsComponent,CompanydetailsComponent, ChartComponent,  
    CriteriadetailsComponent, StudentsidePreviouslyPlacedStudentsComponent,
     StudentsideCompanyComponent, StudentsidePreviousCompaniesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,Ng2SearchPipeModule,
    HttpModule,NgxPaginationModule
  ],
  providers: [
    StudentService,
    MessageService,
    AuthserviceService,
    CompanyService,ChartserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
