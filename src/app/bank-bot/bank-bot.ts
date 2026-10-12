import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  finalize
} from 'rxjs';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import {
  MarkdownComponent
} from 'ngx-markdown';

import {
  ChatbotService
} from '../services/chatbotService';


interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}


@Component({
  selector: 'app-bank-bot',

  standalone: true,

  imports: [
    FormsModule,
    MarkdownComponent
  ],

  templateUrl: './bank-bot.html',

  styleUrl: './bank-bot.css'
})
export class BankBot {

  private readonly chatService =
    inject(ChatbotService);

  private readonly destroyRef =
    inject(DestroyRef);

  private conversationId =
    this.getOrCreateConversationId();
  private getOrCreateConversationId(): string {

    const key =
      'bankConversationId';


    const existingId =
      sessionStorage.getItem(key);


    if (existingId) {
      return existingId;
    }


    const newId =
      crypto.randomUUID();


    sessionStorage.setItem(
      key,
      newId
    );


    return newId;
  }

  @ViewChild('messagesContainer')
  private messagesContainer?: ElementRef<HTMLDivElement>;


  query = '';


  readonly streaming =
    signal(false);


  readonly errorMessage =
    signal<string | null>(null);


  readonly messages =
    signal<ChatMessage[]>([
      {
        role: 'assistant',
        content:
          'Bonjour, je suis votre assistant bancaire. Comment puis-je vous aider ?'
      }
    ]);


  askAgent(): void {

    const question =
      this.query.trim();


    if (
      !question ||
      this.streaming()
    ) {
      return;
    }


    /*
     * 1. Ajouter la question utilisateur
     */
    this.messages.update(messages => [
      ...messages,
      {
        role: 'user',
        content: question
      }
    ]);


    /*
     * 2. Ajouter une réponse assistant vide.
     * Les chunks seront ajoutés dedans progressivement.
     */
    this.messages.update(messages => [
      ...messages,
      {
        role: 'assistant',
        content: ''
      }
    ]);


    /*
     * 3. Nettoyer l'input
     */
    this.query = '';

    this.streaming.set(true);

    this.errorMessage.set(null);

    this.scrollToBottom();


    /*
     * 4. Démarrer le streaming SSE
     */
    this.chatService
      .stream(question,
       this.conversationId)
      .pipe(

        finalize(() => {
          this.streaming.set(false);
        }),

        takeUntilDestroyed(
          this.destroyRef
        )

      )
      .subscribe({

        /*
         * Un nouveau morceau arrive
         */
        next: chunk => {

          this.messages.update(messages => {

            const updatedMessages =
              [...messages];


            const lastIndex =
              updatedMessages.length - 1;


            const lastMessage =
              updatedMessages[lastIndex];


            /*
             * Ajouter le chunk à la réponse
             * actuellement générée.
             */
            updatedMessages[lastIndex] = {
              ...lastMessage,

              content:
                lastMessage.content + chunk
            };


            return updatedMessages;
          });


          this.scrollToBottom();

        },


        error: () => {

          this.errorMessage.set(
            'Impossible de contacter l’assistant bancaire.'
          );

        }

      });

  }



  clearConversation(): void {

    const newConversationId =
      crypto.randomUUID();


    this.conversationId =
      newConversationId;


    sessionStorage.setItem(
      'bankConversationId',
      newConversationId
    );


    this.messages.set([
      {
        role: 'assistant',
        content:
          'Bonjour, je suis votre assistant bancaire. Comment puis-je vous aider ?'
      }
    ]);


    this.errorMessage.set(null);
  }

  private scrollToBottom(): void {

    setTimeout(() => {

      const container =
        this.messagesContainer?.nativeElement;

      if (!container) {
        return;
      }

      container.scrollTop =
        container.scrollHeight;

    });

  }

}
