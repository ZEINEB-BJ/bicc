import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private isChatOpenSubject = new BehaviorSubject<boolean>(false);
  public isChatOpen$ = this.isChatOpenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeChat();
  }

  private initializeChat(): void {
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      text: 'Hello! 👋 Welcome to BICC Shop! I\'m your shopping assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    };
    this.messagesSubject.next([welcomeMessage]);
  }

  sendMessage(userMessage: string): Observable<any> {
    // Add user message
    const userMsg: ChatMessage = {
      id: this.generateId(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Add typing indicator
    const typingMsg: ChatMessage = {
      id: this.generateId(),
      text: 'Typing...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMsg, typingMsg]);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [{
        parts: [{
          text: this.formatPrompt(userMessage)
        }]
      }]
    };

    return new Observable(observer => {
      this.http.post<GeminiResponse>(`${this.API_URL}?key=${this.API_KEY}`, body, { headers })
        .subscribe({
          next: (response) => {
            this.handleBotResponse(response);
            observer.next(response);
            observer.complete();
          },
          error: (error) => {
            console.error('Chatbot API error:', error);
            this.handleError();
            observer.error(error);
          }
        });
    });
  }

  private formatPrompt(userMessage: string): string {
    return `You are a helpful e-commerce shopping assistant for BICC Shop.
    You help customers with:
    - Product inquiries and recommendations
    - Order status and tracking
    - Shipping and delivery questions
    - Payment and billing support
    - Return and refund policies
    - General shopping assistance

    Please provide helpful, friendly, and concise responses.
    If you don't know specific details about the store's policies, acknowledge it politely and suggest contacting customer support.

    User question: ${userMessage}`;
  }

  private handleBotResponse(response: GeminiResponse): void {
    const currentMessages = this.messagesSubject.value;
    // Remove typing indicator
    const messagesWithoutTyping = currentMessages.filter(msg => !msg.isTyping);

    const botText = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process that request. Please try again.';

    const botMessage: ChatMessage = {
      id: this.generateId(),
      text: botText,
      sender: 'bot',
      timestamp: new Date()
    };

    this.messagesSubject.next([...messagesWithoutTyping, botMessage]);
  }

  private handleError(): void {
    const currentMessages = this.messagesSubject.value;
    const messagesWithoutTyping = currentMessages.filter(msg => !msg.isTyping);

    const errorMessage: ChatMessage = {
      id: this.generateId(),
      text: 'Sorry, I\'m having trouble connecting right now. Please try again later or contact our support team.',
      sender: 'bot',
      timestamp: new Date()
    };

    this.messagesSubject.next([...messagesWithoutTyping, errorMessage]);
  }

  toggleChat(): void {
    this.isChatOpenSubject.next(!this.isChatOpenSubject.value);
  }

  closeChat(): void {
    this.isChatOpenSubject.next(false);
  }

  openChat(): void {
    this.isChatOpenSubject.next(true);
  }

  clearChat(): void {
    this.initializeChat();
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
