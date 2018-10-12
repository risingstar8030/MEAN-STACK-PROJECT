import { Component, OnInit } from '@angular/core';
import { Company } from "../../model/company";
import { CompanyService} from "../../services/company.service";
import { StudentService} from "../../services/student.service";

import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-adminupcomingcompany',
  templateUrl: './adminupcomingcompany.component.html',
  styleUrls: ['./adminupcomingcompany.component.css']
})
export class AdminupcomingcompanyComponent implements OnInit {

  constructor(
    private companyService : CompanyService,
    private studentService : StudentService) { }

  ngOnInit() {
    
    this.getListOfCompanies();

  }

p:Number=1;
noCriteria : Number = 0;
allowBacklog: String = 'allowed'
hasCriteria : boolean = true;
hasCriteria1 : boolean = true;
branchSelected:boolean=false;
toggleForm : boolean = false;
companiesAdded :Company[]=[];
selectedCompany : Company;
yearSelected:Number;
currentYear = new Date().getFullYear();

addNextYear(year){
  this.yearSelected = parseInt(year)+ 1;
}

getListOfCompanies(){
  this.companyService.getaddedCompanies(this.currentYear)
    .subscribe(companyList => {
      this.companiesAdded = companyList
    },
    error => console.log(error))
}

addCompany(form){

  if(!form.value.criteria && !form.value.backlog){
    form.value.backlog = 'allowed';
    form.value.criteria = 0;
  }
  if(!form.value.comp){
    form.value.comp=false;
  }
  if(!form.value.it){
    form.value.it=false;
  }
  if(!form.value.entc){
    form.value.entc=false;
  }

  const company : Company = {
    date:form.value.date,
    day:form.value.day,
    time:form.value.time,
    companyName:form.value.companyName,
    ctc:form.value.ctc,
    website:form.value.website,
    comp:form.value.comp,
    it:form.value.it,
    entc:form.value.entc,
    activity1:form.value.activity1,
    activity2:form.value.activity2,
    activity3:form.value.activity3,
    venue1:form.value.venue1,
    venue2:form.value.venue2,
    venue3:form.value.venue3,
    skills:form.value.skills,
    showCompanyToStudents:false,
    showPlacedStudents:false,
    criteria:form.value.criteria,
    backlog:form.value.backlog,
  };
  
  this.companyService.addCompany(form.value.year,company)
  .subscribe(
    data => {console.log(data);
    this.getListOfCompanies();},
    
    error => console.log(error)
  );
    form.resetForm();
    
}

updateCompany(form){

  if(!form.value.criteria && !form.value.backlog){
    form.value.backlog = 'allowed';
    form.value.criteria = 0;
  }

  let newCompany : Company = {
    _id:this.selectedCompany._id,
    date:form.value.date,
    day:form.value.day,
    time:form.value.time,
    companyName:form.value.companyName,
    ctc:form.value.ctc,
    website:form.value.website,
    comp:form.value.comp,
    it:form.value.it,
    entc:form.value.entc,
    activity1:form.value.activity1,
    activity2:form.value.activity2,
    activity3:form.value.activity3,
    venue1:form.value.venue1,
    venue2:form.value.venue2,
    venue3:form.value.venue3,
    skills:form.value.skills,
    showCompanyToStudents:this.selectedCompany.showCompanyToStudents,
    showPlacedStudents:false,
    criteria:form.value.criteria,
    backlog:form.value.backlog,
  }
 
  this.companyService.updateCompany(newCompany)
  .subscribe(
    data => {console.log(data);
    this.getListOfCompanies();},
    
    error => console.log(error)
  )
  this.toggleForm = !this.toggleForm;
}

editCompany(company){
  this.hasCriteria1=true;
  this.selectedCompany = company;
  this.toggleForm = !this.toggleForm;
}

updateShowCompany(company){

  company.showCompanyToStudents = !company.showCompanyToStudents;

  this.companyService.updateShowCompany(company)
  .subscribe(
  data => {
    
    if(data.company.showCompanyToStudents){
      this.studentService.showUpcomingCompanyToStudents(data.company)
      .subscribe(
        data =>console.log(data),
        error => console.log(error)
      )
    }
   else{
      this.studentService.removeUpcomingCompanyToStudents(data.company)
      .subscribe(
        data =>console.log(data),
        error => console.log(error)
      )
    }
  },
  error => console.log(error)
)
}

deleteCompany(id){
    this.companyService.deleteCompany(id)
    .subscribe(data =>{
      console.log(data);
      if(data.result.n==1){
        for(let i=0;i<this.companiesAdded.length;i++){
          if(id == this.companiesAdded[i]._id){
            this.companiesAdded.splice(i,1);
          }
        }
      }
    })
}


toggleCriteria(){
  this.hasCriteria = !this.hasCriteria;
}

toggleCriteriaEditForm(){
  this.hasCriteria1 = !this.hasCriteria1;
}

downloadPDF(company){
  let comp='';
  let it='';
  let entc='';

  if(company.comp){
     comp = "COMP"
  }
  if(company.it){
    it = "IT"
 }
 if(company.entc){
  entc = "E&TC"
}

  var doc = new jsPDF('landscape');

doc.setFontSize(12)
doc.text('PUNE INSTITUTE OF COMPUTER TECHNOLOGY,PUNE-411043',95,19)
doc.text('Training & Placement Cell',125,27)
doc.line(5,33,292,33)
doc.rect(5, 40, 288, 68)
doc.text('Day,Date & Time',7,48)
doc.text('Company Details',57,48)
doc.text('Branch & Criteria',117,48)
doc.text('Activity',182,48)
doc.text('Venue',250,48)
doc.text('Skills Required',10,130)
//first column
doc.text(`${company.day}`,13,65)
doc.text(`${company.date}`,13,75)
doc.text(`${company.time}`,13,85)
//second column
doc.text(`${company.companyName}`,50,65)
doc.text('CTC in LPA :',50,75)
doc.text(`${company.ctc}`,77,75)
doc.text(`${company.website}`,50,85)
//third column
doc.text(`${comp} ${it} ${entc} `,117,65)
doc.text('Criteria (CGPA) :',117,75)
doc.text(`${company.criteria}`,150,75)
doc.text('Backlog :',117,85)
doc.text(`${company.backlog}`,117,95)
//fourth column
doc.text(`${company.activity1}`,163,65)
doc.text(`${company.activity2}`,163,75)
doc.text(`${company.activity3}`,163,85)
//fifth column
doc.text(`${company.venue1}`,228,65)
doc.text(`${company.venue2}`,228,75)
doc.text(`${company.venue3}`,228,85)
//skills column
doc.text(`${company.skills}`,45,115)

doc.text('Instructions for Students :',5,160)
doc.text('1 : Students must report 15 minutes before the scheduled time & must be in uniform',55,160)
doc.text(`2 : Please keep seeing T&P Notice Board Regularly for updates & specially,one day before the activity to know the changes if any.`,51,167)
doc.setFontType('bold')
doc.text('3 : Do not carry mobile phones during on-line/written test :',51,174)
doc.setFontType('bold')
doc.text('TPO',35,200)
doc.setFontType('bold')
doc.text('Principal',250,200)
doc.line(42,40,42,108)
doc.line(105,40,105,108)
doc.line(160,40,160,108)
doc.line(225,40,225,108)
doc.line(5,55,293,55)
doc.rect(5, 110, 288, 40)
doc.line(42,110,42,150)


doc.save(`${company.companyName}.pdf`);

}




}
