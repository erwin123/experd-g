import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chat, Email } from '../model';
import { ChatService } from '../services/chat.service';
import { StatemanagementService } from '../services/statemanagement.service';
import { MailerService } from '../services/mailer.service';
import {forkJoin} from 'rxjs';
import { join } from 'array-join';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() DocType: string;
  lock: boolean = false;
  empInfo: any;
  Chats: Chat[] = new Array();
  Chat: Chat = new Chat();
  constructor(private mailer: MailerService, private chatService: ChatService,
    private stateService: StatemanagementService, private userService:UserService) { }

  ngOnInit() {
    this.empInfo = this.stateService.getStoredEmployee();
    this.getChat();
  }

  getChat() {
    let q = forkJoin(this.chatService.getChat(this.empInfo.UserCode, this.DocType),this.userService.getUserAll());
    q.subscribe(res=> {
      this.Chats = join(res[0].sort((a, b) => {
        if (a.CreatedDate > b.CreatedDate) return -1;
        else if (a.CreatedDate < b.CreatedDate) return 1;
        else return 0;
      }), res[1], { key1: "CreatedBy", key2: "Username" });
    }, err => {
      console.log("No data");
    }, () => {

    })

    // this.chatService.getChat(this.empInfo.UserCode, this.DocType).subscribe(res => {
    //   this.Chats = res.sort((a, b) => {
    //     if (a.CreatedDate > b.CreatedDate) return -1;
    //     else if (a.CreatedDate < b.CreatedDate) return 1;
    //     else return 0;
    //   });
    // }, err => {
    //   console.log("No data");
    // }, () => {

    // });
  }

  onSubmit() {
    this.lock = true;
    let adm: any;
    let coachyMode:boolean = true;
    adm = this.stateService.getStoredADM();
    this.Chat.CreatedBy = this.empInfo.Username;
    if (adm) {
      coachyMode = false;
      this.Chat.CreatedBy = adm.Username;
    }else{
      adm = this.stateService.getStoredMyCoach();
    }
    this.stateService.setTraffic(true);

    this.Chat.OwnerCode = this.empInfo.UserCode;
    this.Chat.DocumentType = this.DocType;

    this.chatService.postChat(this.Chat).subscribe(res => {
      if (res) {
        this.stateService.setTraffic(false);
        
        let doc: string = "";
        switch (this.DocType) {
          case "1":
            doc = "Identify Problem";
            break;
          case "2":
            doc = "Solution & Plan";
            break;
          case "3":
            doc = "Execution 1";
            break;
          case "4":
            doc = "Execution 2";
            break;
          case "5":
            doc = "Execution 3";
            break;
          default:
            doc = "";
            break;
        }
        let mail: Email = new Email();
        mail.MessageSubject = coachyMode ? this.empInfo.Name : adm.Name;
        mail.MessageSubject += " mengirimkan Anda pesan di tahap "+doc;
        mail.MessageBody = "<b>";
        mail.MessageBody += coachyMode ? this.empInfo.Name : adm.Name
        mail.MessageBody += "</b> mengirim pesan : <br/><h3 style='background:#42f4b3; padding:5px;'>" + this.Chat.TheText+"</h3>";
        mail.MessageFrom = "ExperdGuide - ";
        mail.MessageFrom +=  coachyMode ?  this.empInfo.Name: adm.Name;
        mail.MessageTo = coachyMode ? adm.Email : this.empInfo.Email;
        mail.MessageCc = coachyMode ?  this.empInfo.Email: adm.Email;
        console.log(mail);
        console.log(coachyMode);
        this.mailer.sendMail(mail).subscribe(resmail => {
          
          console.log("Mail sent");
          this.getChat();
          this.Chat = new Chat();
          this.lock = false;
        }, errMail =>{
          console.log("Failed send mail");
          this.getChat();
          this.Chat = new Chat();
          this.lock = false;
        })
      }
    });
  }

}
