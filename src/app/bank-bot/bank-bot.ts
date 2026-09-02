import { Component, inject } from '@angular/core';
import { Observable, scan, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ChatbotService } from '../services/chatbotService';

@Component({
  selector: 'app-bank-bot',
  imports: [
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './bank-bot.html',
  standalone: true,
  styleUrl: './bank-bot.css'
})
export class BankBot {

  private readonly chatService = inject(ChatbotService);

  query = '';

  response$?: Observable<string>;

  askAgent(): void {

    const question = this.query.trim();

    if (!question) {
      return;
    }

    this.response$ = this.chatService
      .stream(question)
      .pipe(
        scan(
          (response, chunk) => response + chunk,
          ''
        ),
        startWith('')
      );
  }
}
