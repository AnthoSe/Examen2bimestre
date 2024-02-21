import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, user);
  }

  checkEmailExists(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarCorreo/${correo}`);
  }

  signIn(correo: string, contrasenia: string): Observable<any> {
    const body = { correo, contrasenia };
    return this.http.post<any>(`${this.apiUrl}/signIn`, body)
      .pipe(
        tap(response => {
          if (response.token) {
            // Almacenar el token en localStorage
            localStorage.setItem('token', response.token);
            console.log('Token almacenado:', response.token);
          }
        })
      );
  }

  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getUserRole`);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserById/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateUser/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.apiUrl}/deleteUser/${userId}`);
  }

  // Actualizar contraseña
  actualizarContrasenia(nuevaContrasenia: string): Observable<any> {
    const userId = this.getUserIdFromAuthentication();
    console.log('ID de usuario:', userId);

    if (!userId) {
      console.error('ID de usuario no válido');
      return throwError({ error: 'ID de usuario no válido' });
    }

    const url = `${this.apiUrl}/updatePassword/${userId}`;
    const body = { nuevaContrasenia };

    return this.http.put(url, body)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud de actualización de contraseña:', error);
          throw error;
        })
      );
  }

  private getUserIdFromAuthentication(): string {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token no encontrado');
      return '';
    }
  
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId || '';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return '';
    }
  }

  getCurrentUser(): Observable<User> {
    const userId = this.getUserIdFromAuthentication();
    return this.http.get<User>(`${this.apiUrl}/getUserById/${userId}`);
  }
  verificarToken(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
  }
}
