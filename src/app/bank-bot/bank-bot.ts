import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading';

@Component({
  selector: 'app-bank-bot',
  imports: [],
  templateUrl: './bank-bot.html',
  styleUrl: './bank-bot.css',
})
export class BankBot {

  query : any;
  http = inject(HttpClient);
  response$! : Observable<any>
  public loadingService = inject(LoadingService);
  askAgent() {
    this.response$ = this.http
      .get("http://localhost:9999/CHAT-SERVICE/chat?query="+this.query,
        {responseType:'text'})
  }
}
