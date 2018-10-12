import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import { Message} from '../../model/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private messageService : MessageService
  ) { }

  userId : String;

  ngOnInit() {

    this.userId = localStorage.getItem('userId');
    this.getMessages();
  }

  messages :Object[]=[];
  

  onSubmit(form){

    const message : Message = {
      content:form.value.content
    }
    
    this.messageService.addMessage(this.userId,message)
    .subscribe(
      data => {
        if(data.message == "Saved Message"){
          this.getMessages();
        }
      },
      error => console.log(error)
    )
    form.resetForm();
  }

  getMessages(){

    this.messageService.getMessages()
    .subscribe(
      data => {
        this.messages = data;
      },
      error => console.log(error)
    )
  }

  onDelete(message){

    this.messageService.deleteMessage(message)
    .subscribe(
      data => {
        if(data.obj.n == 1){
          this.getMessages();
        }
      },
      error => console.log(error)
    )
  }

}
