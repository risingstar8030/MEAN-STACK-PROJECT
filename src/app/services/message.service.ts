import { Injectable } from '@angular/core';
import {Http,Response,Headers } from '@angular/http';
import {Message} from '../model/message';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MessageService {

  private messages : Message[]=[];

  constructor(private http :Http) { }

  addMessage(userId : String,message:Message){
    const body = JSON.stringify(message);
    const headers = new Headers({'content-type':'application/json'});
    
    return this.http.post('http://localhost:3000/message/'+userId,body,{headers:headers})
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }

  getMessages(){

    return this.http.get('http://localhost:3000/message')
    .map((res:Response)=>{

     /* const messages = res.json().obj;
      let transFormedMessages:Message[]=[];

      for(let message of messages){
        transFormedMessages.push(new Message(message.content,'suraj',message._id,null));
      }
      this.messages=transFormedMessages;
      return transFormedMessages;*/
      return res.json().obj;
    })
    .catch((err:Response)=>Observable.throw(err.json()));
    
  }

  deleteMessage(message){

    return this.http.delete("http://localhost:3000/message/" + message._id)
    .map((res:Response) => res.json())
    .catch((err:Response)=>Observable.throw(err.json()));
  }
}
