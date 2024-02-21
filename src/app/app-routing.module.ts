import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SubastaACComponent } from './components/subasta-ac/subasta-ac.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { AuthGuard } from './auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes =[
  {path:'home',component:HomeComponent},
  {path:'informacion',component:InformacionComponent},
  {path:'contacto',component:ContactosComponent},
  {path:'subasta-ac',component:SubastaACComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  { path: 'perfil', component: PerfilComponent},
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'admin',component:AdminComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'registro',component:ReporteComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
