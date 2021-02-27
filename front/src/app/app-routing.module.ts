import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Modulos
import { PersonaComponent } from './componentes/persona/persona.component';
import { PersonaRepositorioComponent } from './componentes/persona-repositorio/persona-repositorio.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AdmPersonaComponent } from './componentes/adm-persona/adm-persona.component';
import { MantenimientoCargoComponent } from './componentes/mantenimiento-cargo/mantenimiento-cargo.component';
import {PerfilUsuColComponent } from './componentes/perfil-usu-col/perfil-usu-col.component';
import {NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import {NavBarPrincipalComponent } from './componentes/nav-bar-principal/nav-bar-principal.component';
import { PeriodoComponent } from './componentes/periodo/periodo.component';
import { GradoComponent } from './componentes/grado/grado.component';
import { SeccionComponent } from './componentes/seccion/seccion.component';
import { NivelComponent } from './componentes/nivel/nivel.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { AulaVirtualComponent } from './componentes/aula-virtual/aula-virtual.component';
import { CursoComponent } from './componentes/curso/curso.component';
import { PlanillaNotasComponent } from './componentes/planilla-notas/planilla-notas.component';
import { GaleriaColComponent } from './componentes/galeria-col/galeria-col.component';
import { PerfilColegioComponent } from './componentes/perfil-colegio/perfil-colegio.component';
import { PerfilInicioComponent } from './componentes/perfil-inicio/perfil-inicio.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioPaginaColComponent } from './componentes/inicio-pagina-col/inicio-pagina-col.component';
import { MantenimientoAdministrativoComponent } from './componentes/mantenimiento-administrativo/mantenimiento-administrativo.component';
import { VistaAlumnoComponent } from './componentes/vista-alumno/vista-alumno.component';

import {AuthGuard} from './auth.guard'

/** Cuadro de dialogo */
import { ConfirmDialogComponent } from './componentes/confirm-dialog/confirm-dialog.component';


const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'inicio/:colUrl',component:InicioPaginaColComponent},
  {path:'perfilInicio',component:PerfilInicioComponent, },
  {path:'repositorio',component:PersonaRepositorioComponent, canActivate: [AuthGuard]},
  {path:'profesor',component:ProfesorComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent,},
  {path:'perfil',component:PerfilComponent, canActivate: [AuthGuard]},
  {path:'persona',component:PersonaComponent,},
  //{path:'admPersona',component:AdmPersonaComponent, canActivate: [AuthGuard]},
  {path:'mantenimientoCargo',component:MantenimientoCargoComponent, canActivate: [AuthGuard]},
  {path:'perfil/colegio',component:PerfilUsuColComponent, canActivate: [AuthGuard]},
  {path:'navBar',component:NavBarComponent, canActivate: [AuthGuard]},
  {path:'navBarPrincipal',component:NavBarPrincipalComponent, canActivate: [AuthGuard]},
  {path:'periodo',component:PeriodoComponent, canActivate: [AuthGuard]},

  {path:'grado',component:GradoComponent, canActivate: [AuthGuard]},
  {path:'seccion',component:SeccionComponent, canActivate: [AuthGuard]},
  {path:'nivel',component:NivelComponent, canActivate: [AuthGuard]},
  {path:'turno',component:TurnoComponent, canActivate: [AuthGuard]},
  {path:'matricula',component:MatriculaComponent, canActivate: [AuthGuard]},
  {path:'aulaVirtual',component:AulaVirtualComponent, canActivate: [AuthGuard]},

  {path:'curso',component:CursoComponent, canActivate: [AuthGuard]},
  {path:'planillaNotas',component:PlanillaNotasComponent, canActivate: [AuthGuard]},

  {path:'perfilColegio',component:PerfilColegioComponent, canActivate: [AuthGuard]},
  {path:'galeriaColegio',component:GaleriaColComponent, canActivate: [AuthGuard]},
  {path:'intranet',component:VistaAlumnoComponent, canActivate: [AuthGuard]},
  //{path:'MntAdmin_crabb',component:MantenimientoAdministrativoComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
