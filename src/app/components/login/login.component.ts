import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  emailExistsMessage: string = '';

  constructor(private fb: FormBuilder, private UserService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.loginForm.valid) {
      const { correo, contrasenia } = this.loginForm.value;
  
      // Verificar si el correo ya está registrado antes de intentar iniciar sesión
      this.UserService.checkEmailExists(correo).subscribe(
        emailExists => {
          if (emailExists) {
            // El correo ya está registrado, ahora intenta iniciar sesión
            this.UserService.signIn(correo, contrasenia).subscribe(
              response => {
                console.log('Inicio de sesión exitoso:', response);
  
                localStorage.setItem('token', response.token);
                if (response.cargo === 'admin') {
                  // Redirige a la página de administrador
                  this.router.navigate(['/admin']);
                } else if (response.cargo === 'cliente') {
                  // Redirige a la página de perfil
                  this.router.navigate(['/perfil']);
                }
              },
              error => {
                console.error('Error al iniciar sesión:', error);
  
                // Manejar el error, mostrar un mensaje al usuario, etc.
                if (error.status === 401) {
                  this.errorMessage = 'Credenciales incorrectas.';
                } else {
                  this.errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
                }
              }
            );
          } else {
            // El correo no está registrado
            this.emailExistsMessage = 'El correo electrónico no está registrado. Por favor, regístrate antes de iniciar sesión.';
          }
        },
        error => {
          console.error('Error al verificar el correo:', error);
          this.emailExistsMessage = 'Error al verificar el correo. Por favor, intenta nuevamente.';
        }
      );
    }
  }
}
