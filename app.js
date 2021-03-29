const express=require('express');
const mongoose=require('mongoose'); 
const {database} =require('./keys');
const config=require('./config');
const app =config(express()); 
const morgan=require('morgan');
const cors=require('cors');
var socket = require('socket.io');


const multer = require('multer');
var uuid = require('uuid');
const path = require('path');
uuid=uuid.v4();
console.log(uuid);

app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {

        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));


//Iniciando el servidor
const server = app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port')); 
});



//Llamar a la base de datos


//Funciones

app.use(morgan('dev'));
app.use(express.json()); // Reconocer el formato JSON 
app.use(cors({origin:'http://localhost:4200'}));


email = []; 
dsv = [];
creative = [];



mongoose.connect(database.uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db=>{
    console.log('DB is connected');
})
.catch(err=>console.error(err));

var io = socket(server);


io.on('connection', function(socket) {
    console.log('New connection made!!', socket.id);
    // new user online
   socket.on('new user', function(data) {
   socket.join(data.room);
    if (data.room == 'Email Marketing') {
        socket.nickname1 = data;
        email.push(socket.nickname1);
        console.log('Email', email);
        io.in(data.room).emit('usernames', email);
    } else if (data.room == 'Dsv & Preview') {
        socket.nickname2 = data;
        dsv.push(socket.nickname2);
        console.log('Dsv', dsv);
    io.in(data.room).emit('usernames', dsv);
    } else {
        socket.nickname3 = data;
        creative.push(socket.nickname3);
        console.log('Creative', creative);
    io.in(data.room).emit('usernames', creative);
    }
});

socket.on('disconnect', function(data) {
    console.log('disconnected', socket.id);
    var forEmail = email.indexOf(socket.nickname1);
    var forDsv = dsv.indexOf(socket.nickname2);
    var forCreative = creative.indexOf(socket.nickname3);
    if(forEmail !== -1) {
        email.splice( forEmail, 1);
        io.in('Email Marketing').emit('usernames', email);
    } else if (forDsv !== -1) {
        dsv.splice( forDsv, 1);
        io.in('Dsv & Preview').emit('usernames', dsv); 
    } else if (forCreative !== 1) {
        creative.splice(forCreative, 1);
        io.in('Creative').emit('usernames', creative);   
    }
})
 
socket.on('join', function(data) {
    socket.join(data.room);

    console.log(data.user + ' Joined the room :- ' + data.room);
    socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message:'Se unio a la sala !!'});
});

socket.on('leave', function(data) {
    console.log(data.user + ' left the room :- ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {user: data.user, message:'Salio de la sala !!'});
    socket.leave(data.room);
    if (data.room == 'Email Marketing') {
        socket.nickname1 = data;
        email.pop(socket.nickname1);
        console.log('Email', email);
        io.in(data.room).emit('usernames', email);
    } else if (data.room == 'Dsv & Preview') {
        socket.nickname2 = data;
        dsv.pop(socket.nickname2);
        console.log('Dsv', dsv);
    io.in(data.room).emit('usernames', dsv);
    } else {
        socket.nickname3 = data;
        creative.pop(socket.nickname3);
        console.log('Creative', creative);
    io.in(data.room).emit('usernames', creative);
    }
});

socket.on('message', function(data) {
    var d = new Date();
   // chat.insertOne(data, function(err, res) {
     //   console.log('Wooo...New message Inserted in database!!')
   // })
    io.in(data.room).emit('new message', {user: data.user, message: data.message, time: data.Time}); 
});

socket.on('typing', function(data) {
    console.log(data.user + ' typing in room :- ' + data.room);
    socket.broadcast.to(data.room).emit('user typing', {user: data.user, message:'is typing ...!!'});

});

}); 


/************** Referente al caso de Cuentas y accesos **************************************************************/
app.use('/Inicio/RepositorioPersonas',require('./route/personaRepositorio.route')); //Ruta de repositorio de personas
app.use('/Inicio/Persona',require('./route/persona.route')); //Ruta de personas
app.use('/Inicio/Estado',require('./route/estado.route')); //Ruta de estados
app.use('/Inicio/Login',require('./route/login.route')); //Ruta de login


/************** Referente al caso de perfiles ********************************************* */
app.use('/Inicio/Administrador',require('./route/administrador.route')); //Ruta de Aministrador
app.use('/Inicio/Alumno',require('./route/alumno.route')); //Ruta de alumno
app.use('/Inicio/Auxiliar',require('./route/auxiliar.route')); //Ruta de auxiliar
app.use('/Inicio/Cargo',require('./route/cargo.route')); //Ruta de cargo
app.use('/Inicio/Colegio',require('./route/colegio.route')); //Ruta de colegio
app.use('/Inicio/Coordinador',require('./route/coordinador.route')); //Ruta de coordinador
app.use('/Inicio/Secretaria',require('./route/secretaria.route')); //Ruta de secretaria
app.use('/Inicio/Apoderado',require('./route/apoderado.route')); //Ruta de secretaria


app.use('/Inicio/HistorialRegistro',require('./route/historialRegistro.route')); //Ruta de historial registro
app.use('/Inicio/Perfil',require('./route/perfil.route')); //Ruta de perfil
app.use('/Inicio/Periodo',require('./route/periodo.route')); //Ruta de periodo
app.use('/Inicio/DetallePeriodo',require('./route/detallePeriodo.route')); //Ruta de periodo
app.use('/Inicio/TipoPeriodo',require('./route/tipoPeriodo.route')); //Ruta de tipo accion
app.use('/Inicio/Profesor',require('./route/profesor.route')); //Ruta de profesor
app.use('/Inicio/Director',require('./route/director.route')); //Ruta de sub director
app.use('/Inicio/SubDirector',require('./route/subDirector.route')); //Ruta de sub director
app.use('/Inicio/TipoAccion',require('./route/tipoAccion.route')); //Ruta de tipo accion

/************** Referente al caso de matriculas **************************************** */
app.use('/Inicio/Grado',require('./route/grado.route')); //Ruta de Grado
app.use('/Inicio/Seccion',require('./route/seccion.route')); //Ruta de Seccion
app.use('/Inicio/Nivel',require('./route/nivel.route')); //Ruta de Nivel
app.use('/Inicio/Turno',require('./route/turno.route')); //Ruta de  Turno
app.use('/Inicio/Matricula',require('./route/matricula.route')); //Ruta de Matricula
app.use('/Inicio/AulaVirtual',require('./route/aulaVirtual.route')); //Ruta de Aula Virtual

/************** Referente al caso de Cursos ******************************************************************/
app.use('/Inicio/CursoGrado',require('./route/cursoGrado.route')); //Ruta de Curso grado
app.use('/Inicio/AulaCurso',require('./route/aulaCurso.route')); //Ruta de Ciencia


/************** Referente al caso de Notas del alumno ******************************************************************/
app.use('/Inicio/TipoNotaCurso',require('./route/tipoNotaCurso.route')); //Ruta deTipoNotaCurso
app.use('/Inicio/TipoNota',require('./route/tipoNota.route')); //Ruta de TipoNota
app.use('/Inicio/Nota',require('./route/nota.route')); //Ruta de Nota
app.use('/Inicio/promedio',require('./route/promedio.route')); //Ruta de Promedio
app.use('/Inicio/promedioArea',require('./route/promedioArea.route')); //Ruta de Promedio Area

app.use('/Inicio/colegioImg',require('./route/colegioImg.route')); 


app.use('/Inicio/tipoImagen',require('./route/tipoImagen.route')); 

app.use('/Inicio/IntervaloHorario',require('./route/intervaloHorario.route')); 
app.use('/Inicio/Horario',require('./route/horario.route')); 

app.use('/Inicio/BioQuienesSomos',require('./route/bioQuienesSomos.route')); 
app.use('/Inicio/BioActividad',require('./route/bioActividad.route')); 
app.use('/Inicio/BioNivel',require('./route/bioNivel.route')); 
app.use('/Inicio/BioTaller',require('./route/bioTaller.route')); 
app.use('/Inicio/BioInfraestructura',require('./route/bioInfraestructura.route')); 
app.use('/Inicio/BioAnuncio',require('./route/bioAnuncio.route')); 
app.use('/Inicio/BioPortada',require('./route/bioPortada.route')); 

app.use('/MntAdmin_crabb/NucleoImagen',require('./route/nucleoImagen.route')); 
app.use('/MntAdmin_crabb/NucleoPortada',require('./route/nucleoPortada.route')); 
app.use('/MntAdmin_crabb/NucleoArea',require('./route/nucleoArea.route')); 
app.use('/MntAdmin_crabb/NucleoCurso',require('./route/nucleoCurso.route')); 
app.use('/MntAdmin_crabb/NucleoCurricula',require('./route/nucleoCurricula.route')); 
app.use('/MntAdmin_crabb/NucleoCurricula',require('./route/secretaria.route')); 

app.use('/Inicio/TipoPago',require('./route/tipoPago.route')); 
app.use('/Inicio/Pago',require('./route/pago.route')); 
app.use('/Inicio/Agenda',require('./route/agenda.route')); 
app.use('/Inicio/Chat',require('./route/chat.route')); 
