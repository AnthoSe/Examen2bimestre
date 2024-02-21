import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: User[];
  usuarioEditando: User | null;
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoCargo: string = '';
  mostrarContrasenia: boolean = false; // Agrega esta línea

  constructor(private UserService: UserService) {
    this.users = [];
    this.usuarioEditando = null;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.UserService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
// EDITAR USUARIO 
editarUsuario(usuario: User): void {
  this.usuarioEditando = usuario;
  this.nuevoNombre = usuario.nombre || '';
  this.nuevoCorreo = usuario.correo || '';
  this.nuevoCargo = usuario.cargo || '';
}
// CONTRASEÑA CIFRADA
mostrarContraseniaUsuario(user: User): string {
  return this.mostrarContrasenia ? user.contrasenia.replace(/\./g, '*') : '********';
}


guardarEdicion(): void {
  if (this.usuarioEditando) {
    const newData = {
      nombre: this.usuarioEditando.nombre,
      correo: this.usuarioEditando.correo,
      cargo: this.usuarioEditando.cargo
    };

    const userId = this.usuarioEditando._id;

    this.UserService.updateUser(userId, newData).subscribe(
      response => {
        console.log('Usuario actualizado exitosamente:', response);
        this.getAllUsers();
        this.usuarioEditando = null;
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }
}


// ELIMINAR USUARIO 
  eliminarUsuario(usuario: User): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      const userId = usuario._id;
  
      this.UserService.deleteUser(userId).subscribe(
        response => {
          console.log('Usuario eliminado exitosamente:', response);
          this.getAllUsers();
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }
}
