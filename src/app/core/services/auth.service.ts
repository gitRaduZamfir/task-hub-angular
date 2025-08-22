import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface User {
  id: number;
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:3000/users";
  private currentUser: User | null = null;

  constructor( private http: HttpClient ) {}

  login(username: string, password: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
    .pipe(
      tap(users => {
        if(users.length > 0){
          this.currentUser = users[0];
          sessionStorage.setItem('user', JSON.stringify(this.currentUser));
        }
      })
    );
  }

  logout(){
    this.currentUser = null;
    sessionStorage.removeItem('user');
  }

  getUser(): User | null {
    return this.currentUser ?? JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
