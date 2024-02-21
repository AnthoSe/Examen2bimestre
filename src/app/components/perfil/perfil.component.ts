// perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userId: string = '';
  contraseniaAntigua: string = '';
  nuevaContrasenia: string = '';
  confirmarNuevaContrasenia: string = '';
  contraseniaError: string = '';

  constructor(private userService: UserService) {
    this.userId = this.getUserIdFromAuthentication();
  }

  ngOnInit() {
    this.loadCurrentUser();
    const token = localStorage.getItem('token');
    console.log('Token:', token);
  }

  loadCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        // Almacenar la contraseña actual del usuario
        this.contraseniaAntigua = user.contrasenia;
      },
      (error) => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  actualizarContrasenia() {
    // Validar que la nueva contraseña y la confirmación no estén vacías
    if (!this.nuevaContrasenia || !this.confirmarNuevaContrasenia) {
      this.contraseniaError = 'La nueva contraseña y la confirmación son requeridas.';
      return;
    }

    // Validar que la nueva contraseña y la confirmación coincidan
    if (this.nuevaContrasenia !== this.confirmarNuevaContrasenia) {
      this.contraseniaError = 'La nueva contraseña y la confirmación no coinciden.';
      return;
    }

    this.contraseniaError = ''; // Reiniciar el mensaje de error

    // Continuar con la lógica de actualización de contraseña
    const userId = this.userId;
    const nuevaContrasenia = this.nuevaContrasenia;

    this.userService.actualizarContrasenia(nuevaContrasenia).subscribe(
      (response: any) => {
        console.log('Contraseña actualizada exitosamente', response);
      },
      (error) => {
        console.error('Error al actualizar la contraseña:', error);

        // Imprime el cuerpo de la respuesta de error
        if (error.error) {
          console.error('Cuerpo de la respuesta de error:', error.error);
        }
      }
    );
  }

  private getUserIdFromAuthentication(): string {
    // Lógica para obtener el ID del usuario desde tu sistema de autenticación
    return 'userId';
  }
}
