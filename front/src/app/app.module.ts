import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS }from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {MatMenuModule, matMenuAnimations} from '@angular/material/menu';
import {MatDialog, MatDialogModule,MatTooltipModule} from '@angular/material';

//Modulos
import { PersonaComponent } from './componentes/persona/persona.component';
import { PersonaRepositorioComponent } from './componentes/persona-repositorio/persona-repositorio.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AdmPersonaComponent } from './componentes/adm-persona/adm-persona.component';
import { MantenimientoCargoComponent } from './componentes/mantenimiento-cargo/mantenimiento-cargo.component';
import { PerfilUsuColComponent } from './componentes/perfil-usu-col/perfil-usu-col.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { NavBarPrincipalComponent } from './componentes/nav-bar-principal/nav-bar-principal.component';
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
import { ColegioComponent } from './componentes/colegio/colegio.component';
import { PagoComponent } from './componentes/pago/pago.component';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { LibroEvalucionComponent } from './componentes/libro-evalucion/libro-evalucion.component';

/** Cuadro de dialogo (Modales) */
import { ConfirmDialogComponent } from './componentes/confirm-dialog/confirm-dialog.component';
import { HorarioModalComponent } from './componentes/horario-modal/horario-modal.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { EvaluacionComponent } from './componentes/evaluacion/evaluacion.component';

import { ModalOptionsComponent } from './componentes/modal-options/modal-options.component';
import { ModalOptPeriodoComponent } from './componentes/modal-opt-periodo/modal-opt-periodo.component';
import { ModalOptAulaVirtualComponent } from './componentes/modal-opt-aula-virtual/modal-opt-aula-virtual.component';
import { ModalOptMatriculaComponent } from './componentes/modal-opt-matricula/modal-opt-matricula.component';
import { ModalPerfilColegioComponent } from './componentes/modal-perfil-colegio/modal-perfil-colegio.component';
import { ModalOptInicioComponent } from './componentes/modal-opt-inicio/modal-opt-inicio.component';
import { ModalOptBarraComponent } from './componentes/modal-opt-barra/modal-opt-barra.component';
import { ModalOptPlanillaNotasComponent } from './componentes/modal-opt-planilla-notas/modal-opt-planilla-notas.component';
import { ModalOptCursoComponent } from './componentes/modal-opt-curso/modal-opt-curso.component';
import { ModalPagoComponent } from './componentes/modal-pago/modal-pago.component';
import { ModalOptLibroComponent } from './componentes/modal-opt-libro/modal-opt-libro.component';


//Servicios
import {PersonaService} from './servicios/persona.service';
import {PersonaRepositorioService} from './servicios/persona-repositorio.service';
import {LoginService} from './servicios/login.service';
import {DatasocketService} from './servicios/datasocket.service';
import {ChatService} from './servicios/chat.service';
import {DataService} from './servicios/data.service';


import {AuthGuard} from './auth.guard'
import {TokenInterceptorService} from './servicios/token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    PerfilInicioComponent,
    PersonaComponent,
    PersonaRepositorioComponent,
    ProfesorComponent,
    LoginComponent,
    PerfilComponent,
    AdmPersonaComponent,
    MantenimientoCargoComponent,
    PerfilUsuColComponent,
    NavBarComponent,
    NavBarPrincipalComponent,
    PeriodoComponent,
    GradoComponent,
    SeccionComponent,
    NivelComponent,
    TurnoComponent,
    MatriculaComponent,
    AulaVirtualComponent,
    CursoComponent,
    ConfirmDialogComponent,
    PlanillaNotasComponent,
    GaleriaColComponent,
    PerfilColegioComponent,
    HorarioModalComponent,
    ModalOptionsComponent,
    ModalOptPeriodoComponent,
    ModalOptAulaVirtualComponent,
    ModalOptMatriculaComponent,
    ModalPerfilColegioComponent,
    ModalOptInicioComponent,
    ModalOptBarraComponent,
    ModalOptPlanillaNotasComponent,
    ModalOptCursoComponent,
    ModalPagoComponent,
    InicioComponent,
    InicioPaginaColComponent,
    MantenimientoAdministrativoComponent,
    VistaAlumnoComponent,
    ColegioComponent,
    PagoComponent,
    AgendaComponent,
    ChatComponent,
    LibroComponent,
    EvaluacionComponent,
    ModalOptLibroComponent,
    LibroEvalucionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    HorarioModalComponent,
    ModalOptionsComponent,
    ModalOptPeriodoComponent,
    ModalOptAulaVirtualComponent,
    ModalOptMatriculaComponent,
    ModalPerfilColegioComponent,
    ModalOptPlanillaNotasComponent,
    ModalOptInicioComponent,
    ModalOptBarraComponent,
    ModalOptCursoComponent,
    ModalPagoComponent,
    ModalOptLibroComponent,
  ]
  ,
  providers: [
    PersonaService,
    PersonaRepositorioService,
    LoginService,
    AuthGuard,
    DatasocketService,
    ChatService,
    DataService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
