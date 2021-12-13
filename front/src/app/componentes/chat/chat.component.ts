import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChatService } from '../../servicios/chat.service';
import { Item } from '../../modelos/item';
import { DataService } from '../../servicios/data.service';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  @Input() inputColCod:string;
  @Input() codMbr:string;
  @Input() idSala:string;

  perRepCod: string;

  AllUsersOnline = [];
  historyMessages = [];
  chatHistory = [];
  showHistory = false;
  user = '';
  room: string;
  messageText: string;
  messageArray: Array<{user: string, message: string, time: string}> = [];
  historyArray: Item[] = [];
  typingShow = {
    user:'',
    message:''
  };
  Name = '';
  userName = '';
  showJoin = false;
  showTypingPara = false;
  @ViewChild('chatWindow', { static: true }) chatWindow: ElementRef;

  constructor(
    private chatService: ChatService, 
    private dataService: DataService, 
    private router: Router, 
    private mntAdminCrabbService: MntAdminCrabbService,
    private personaRepositorioService: PersonaRepositorioService) {
    this.chatService.newUserJoined()
  .subscribe( data => this.messageArray.push(data));

  this.chatService.userLeftRoom()
  .subscribe(data => this.messageArray.push(data));

  this.chatService.newMessageReceived()
  .subscribe(data => {
    this.messageArray.push(data);
    this.playAudio();
    this.typingShow = {
      user:'',
      message:''
    };
    //this.messageText = '';
  });

  this.chatService.userTyping()
  .subscribe(data => this.typingShow = data);

  this.chatService.allChat()
  .subscribe( data => this.chatHistory = data);

  this.chatService.allOnlineUsers()
  .subscribe( data => this.AllUsersOnline = data);

  }

  ngOnInit() {

  this.room=this.idSala;
  
  this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
  this.perRepCod= this.mntAdminCrabbService.decript(this.perRepCod);
  this.personaRepositorioService.getPersonaById(this.perRepCod)
  .subscribe(res=>{
    this.Name= res["perRepNom"] + ", " + res["perRepApe"];
    this.userName = res["perRepNom"] + ", " + res["perRepApe"];
    this.join();
  })

  

  console.log(this.Name);
  console.log(this.inputColCod);
  console.log(this.codMbr);
  console.log(this.idSala);

  }
  
  playAudio() {
    const audio = new Audio();
    audio.src = './assets/msg1.mp3';
    audio.load();
    audio.play();
    }
    
  join() {
    this.chatService.joinRoom({user: this.Name, room: this.room});
    // for new user online
    this.chatService.newUser({user: this.userName, room: this.room});
    this.getMessages();

    this.showJoin = true;
    // console.log(this.chatHistory);
    // console.log(this.AllUsersOnline);
    this.showHistory = true;
  }
  leave() {
    this.chatService.leaveRoom({user: this.Name, room: this.room});
    this.historyMessages = [];
    this.messageArray = [];
    this.AllUsersOnline = [];
    this.showJoin = false;
  }
  sendMessage(event) {
    console.log(event)
    const date = new Date().toDateString();
    const time = new Date().toTimeString().split(' ')[0];
    this.chatService.sendMessage({user: this.Name, room: this.room, message: this.messageText, Date: date, Time: time});
    this.messageText='';
    this.addMessage();
  }
  showTyping(event) {
    this.showTypingPara = true;
    if(event.code === "Enter"){
      
    const date = new Date().toDateString();
    const time = new Date().toTimeString().split(' ')[0];
    this.chatService.sendMessage({user: this.Name, room: this.room, message: this.messageText, Date: date, Time: time});
    this.addMessage();
    this.messageText='';
    this.showTypingPara = false;
    }
    this.chatService.typing({user: this.Name, room: this.room});
    
  }

  addMessage() {
    this.showTypingPara = false;
    const date1 = new Date().toDateString();
    const time1 = new Date().toTimeString().split(' ')[0];
    const newUser = {
      room: this.idSala,
      perRepCod: this.perRepCod,
      message: this.messageText,
      date: date1,
      time: time1
    };
    this.dataService.saveMessage(newUser)
    .subscribe(
      res => {
        console.log('Message saved!!');
            },
      err => {
        console.log('this is error', err);
       }
    );
  }
  getMessages() {
  
    this.dataService.allMessages(this.idSala)
    .subscribe(res => {
      this.historyMessages = res;
      console.log(this.historyMessages);
      },
      err => { console.log(err); }
    );
  }
  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/ChatLogin']);
   // localStorage.removeItem('email');
  }

  ngOnDestroy(){
    this.leave();
  }


}
