import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {

  private readonly apiUrlChat = `${environment.api.gateway}/CHAT-SERVICE/chat`;

  stream(
    query: string,
    conversationId: string
  ): Observable<string> {

    return new Observable<string>(
      observer => {

        const url =
          `${this.apiUrlChat}` +
          `?query=${encodeURIComponent(query)}` +
          `&conversationId=${encodeURIComponent(conversationId)}`;

        const eventSource =
          new EventSource(url);

        let receivedData = false;

        eventSource.onmessage =
          (event: MessageEvent<string>) => {

            receivedData = true;

            observer.next(
              event.data.substring(1)
            );
          };


        eventSource.onerror = () => {

          eventSource.close();

          if (receivedData) {

            observer.complete();

            return;
          }

          observer.error(
            new Error(
              'Impossible de contacter le chatbot.'
            )
          );
        };


        return () => {
          eventSource.close();
        };

      }
    );
  }
}
