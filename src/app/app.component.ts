import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Agrega la importación del Router
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'subasta';
  isAdmin: boolean = false;

  constructor(public UserService: UserService, public router: Router) {}

  ngOnInit() {
    // Suscríbete al observable para obtener el rol del usuario
    this.UserService.getUserRole().subscribe(
      role => {
        // Compara el rol obtenido
        this.isAdmin = role === 'admin';
      },
      error => {
        console.error('Error al obtener el rol del usuario:', error);
      }
    );
  }

  signIn() {
    // Aquí va la lógica de inicio de sesión

    // Después de una autenticación exitosa, navega a la página de perfil
    this.router.navigate(['/perfil']);
  }
}
