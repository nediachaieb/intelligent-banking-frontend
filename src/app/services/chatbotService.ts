import { inject, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {

  private http =
    inject(HttpClient);

  private readonly apiUrlChat = `${environment.api.gateway}/CHAT-SERVICE/chat`;

  stream(query: string): Observable<string> {

    return new Observable<string>((observer) => {

      const url =
        `${this.apiUrlChat}?query=${encodeURIComponent(query)}`;

      const eventSource = new EventSource(url);

      eventSource.onmessage = (event: MessageEvent<string>) => {
        observer.next(event.data.substring(1));
      };

      eventSource.onerror = () => {
        eventSource.close();
        observer.complete();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
