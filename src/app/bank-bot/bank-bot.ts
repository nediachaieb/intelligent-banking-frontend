import { Component, inject } from '@angular/core';
import { HttpClient, HttpDownloadProgressEvent, HttpEventType } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoadingService } from '../services/loading';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-bank-bot',
  imports: [
    FormsModule,
    AsyncPipe,
    MarkdownComponent
  ],
  templateUrl: './bank-bot.html',
  standalone: true,
  styleUrl: './bank-bot.css'
})
export class BankBot {

  query : any;
  http = inject(HttpClient);
  response$! : Observable<any>
  public loadingService = inject(LoadingService);
  // askAgent() {
  //   this.response$ = this.http
  //     .get("http://localhost:9999/EBANK-BOT/chat?query="+this.query,
  //       {responseType:'text'})
  // }
  askAgent() {
    this.response$ = this.http
      .get("http://localhost:9999/CHAT-SERVICE/chat?query="+this.query,
        {responseType:'text', observe : "events", reportProgress : true})
      .pipe(map(event => {
        switch (event.type){
          case HttpEventType.Sent:
            return {'type': 'Sent'}
          case HttpEventType.DownloadProgress:
            return  {type: "Response", content : (event as HttpDownloadProgressEvent).partialText }
          case HttpEventType.Response:
            return {type : "Response", content : event.body}
          default :
            return {type : 'Other', data : event}
        }
      }))
  }
}
