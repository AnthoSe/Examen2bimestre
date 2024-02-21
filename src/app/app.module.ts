import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SubastaACComponent } from './components/subasta-ac/subasta-ac.component';
import { SubastaANComponent } from './components/subasta-an/subasta-an.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'; // Asegúrate de importar JwtHelperService y JwtModule aquí

import { TokenInterceptorService } from './services/token-interceptor.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { OperadorComponent } from './components/operador/operador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubastaACComponent,
    SubastaANComponent,
    InformacionComponent,
    ContactosComponent,
    LoginComponent,
    RegistroComponent,
    AdminComponent,
    ClienteComponent,
    ReporteComponent,
    PerfilComponent,
    OperadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
    AuthGuard,
    UserService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
