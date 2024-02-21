import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registro: FormGroup;
  correoExistente = false;

  constructor(private fb: FormBuilder, private UserService: UserService,private router:Router) {
    this.registro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['',Validators.required],
      cargo: ['cliente']
    });
  }

  OnSubmit() {
    if (this.registro.valid) {
      const correo = this.registro.get('correo')?.value;

      // Consultar si el correo ya existe
      this.UserService.checkEmailExists(correo).subscribe(
        emailExists => {
          if (emailExists) {
            console.log('El correo ya existe en la base de datos.');
            // Muestra un mensaje indicando que el correo ya existe
            this.correoExistente = true;
            
          } else {
            console.log('El correo no existe en la base de datos. Registrando...');
            alert('Felicidades '+ this.registro.get('nombre')?.value+' Ingresa al login e ingresa tus datos');
            // Si el correo no existe, procede a registrar al usuario
            this.router.navigate(['/login']);
            const userData = this.registro.value;
            this.UserService.createUser(userData).subscribe(
              response => {
                console.log('Registrado:', response);
                // Muestra un mensaje de éxito y realiza acciones adicionales si es necesario
                alert('¡Felicidades! El registro fue exitoso. Ahora puedes iniciar sesión.');
                
              },
              error => {
                console.error('Error al registrar:', error);
              }
            );
          }
        },
        error => {
          console.error('Error al verificar el correo:', error);
        }
      );
    }
  }
}
