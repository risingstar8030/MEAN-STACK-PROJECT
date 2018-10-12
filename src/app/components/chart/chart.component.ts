import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {ChartserviceService } from '../../services/chartservice.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    private chartService : ChartserviceService
  ) { }

  ngOnInit() {
  }

  chart = [];
  yearSelected : Number;
  studentsList=[];
  compStudents : number = 0;
  itStudents: number=0;
  entcStudents :number=0;
  
  addNextYear(year){
    this.yearSelected = parseInt(year)+ 1;
  }

  getStudents(form){

    this.chartService.getPlacedStudents(form.value.year)
    .subscribe(
      data =>{
        if(data.result){
          for(let i=0;i< data.result.length;i++){
            if(data.result[i].branch == 'comp'){
              this.compStudents = this.compStudents + 1;
            }
            if(data.result[i].branch == 'it'){
              this.itStudents = this.itStudents +1;
            }
            if(data.result[i].branch == 'entc'){
              this.entcStudents = this.entcStudents + 1;
            }
          }
  
          this.compStudents = (this.compStudents * 100)/data.result.length;
          this.itStudents = (this.itStudents * 100)/data.result.length;
          this.entcStudents = (this.entcStudents * 100)/data.result.length;
  
          this.createChart();
        }
        else{
          console.log(data.title);
        }
       
      },
      error => console.log(error)
    )
  }

  createChart(){

    this.chart  =  new Chart('canvas',{
      type: 'pie',
			data: {
				datasets: [{
          data: [this.compStudents.toPrecision(4),this.itStudents.toPrecision(4),this.entcStudents.toPrecision(4)],
          backgroundColor: [
					'#76EE00','#ff87c3','#ffff4c'
					],
				}],
				labels: [
          'COMP','IT','E&TC'
        ]
			},
			options: {
        responsive: true,
        duration: 2000,
			}
    });
  }

}
