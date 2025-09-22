import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactForm {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:8080/customer/contact';

  constructor(private http: HttpClient) {}

  sendContactForm(form: ContactForm): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('nom', form.nom);
    body.set('email', form.email);
    body.set('sujet', form.sujet);
    body.set('message', form.message);
    return this.http.post<boolean>(this.apiUrl, body.toString(), { headers });
  }
}
