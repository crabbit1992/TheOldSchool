const mongoose=require('mongoose');
const { Schema } = mongoose;

const LibroSchema= new Schema({
    libTtl:{type: String, required:true},           //titulo
    libIntroducción:{type: String, required:true},     //introducción
    libDedicatoria:{type: String, required:true},      //dedicatoria
    libBibliografia:{type: String, required:true},     //bibliografia
    libPresentacion:{type: String, required:true},     //presentacion
    curCod:{type: String, required:true},           //curso
    graCod:{type: String, required:true},           //grado 
    nivCod:{type: String, required:true},           //nivel
    colCod:{type: String, required:true},           //colegio
});

const TemaSchema= new Schema({
    codigoLibro:{type: String, required:true},
    titulo:{type: String, required:true},
    descripcion:{type: String, required:true},
    subtema:[
        {
            titulo,
            descripcion,
            imagen
        }
    ],
    evaluacion:{
        codEvaluacion,
        tipoEva,
    }  
});

module.exports= mongoose.model('Administrador',AdministradorSchema);