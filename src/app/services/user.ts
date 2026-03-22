import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/user/all`);
  }

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/admin/create`, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/user/update/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/admin/delete/${id}`);
  }
}