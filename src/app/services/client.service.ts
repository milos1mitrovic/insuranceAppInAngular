import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllClients() {
    return this.http.get<Client[]>(`${this.apiUrl}posts`).pipe(
      map((res: Client[]) => {
        return res;
      })
    );
  }

  postClient(data: Client) {
    return this.http.post<Client>(`${this.apiUrl}posts`, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateClient(data: Client, id: number) {
    return this.http.put<Client>(`${this.apiUrl}posts/${id}`, data).pipe(
      map((res: Client) => {
        return res;
      })
    );
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`${this.apiUrl}posts/${id}`).pipe(
      map((res: Client) => {
        return res;
      })
    );
  }
}
