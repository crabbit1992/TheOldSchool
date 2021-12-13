const Libro = require('../model/Libro');
const LibroCtrl = {};

LibroCtrl.getLibros = async (req, res) => {

    const gp={
        colCod: req.params.colCod,
    }

    const libro = await Libro.find({ colCod: gp.colCod})
    .populate('areCod')
    .populate('curCod')
    .populate('nivCod')
    .populate('graCod')
    .sort (  { "nivCod" :  -1, "graCod" :  1  }  )
    res.json(libro); 
};

LibroCtrl.getLibrosCur = async (req, res) => {

    const gp={
        curCod: req.body.curCod,
        nivCod: req.body.nivCod,
        graCod: req.body.graCod,
        colCod: req.body.colCod,
    }

    console.log(gp);

    const libro = await Libro.find(
        { 
            curCod: gp.curCod,
            nivCod: gp.nivCod,
            graCod: gp.graCod,
            colCod: gp.colCod,
        })
    .populate('areCod')
    .populate('curCod')
    .populate('nivCod')
    .populate('graCod')
    .sort (  { "nivCod" :  -1, "graCod" :  1  }  )
    console.log(libro);
    res.json(libro); 
};

LibroCtrl.getLibrosFiltro = async (req, res) => {

    const gp={
        colCod: req.body.colCod,
        curCod: req.body.curCod,
        graCod: req.body.graCod,
        nivCod: req.body.nivCod,
    }

    console.log(gp);

    var libro=[];

    if(gp.curCod!=undefined && gp.graCod!=undefined && gp.nivCod!=undefined && gp.colCod!=undefined){
        /** buscar libros de nivel, grado y curso */
        libro = await Libro.find({colCod: gp.colCod, curCod: gp.curCod, graCod:gp.graCod,nivCod:gp.nivCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod!=undefined && gp.nivCod!=undefined && gp.colCod!=undefined){
        /** buscar libros de nivel y grado */
        libro = await Libro.find({colCod: gp.colCod, graCod:gp.graCod, nivCod:gp.nivCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod==undefined && gp.nivCod!=undefined && gp.curCod!=undefined&& gp.colCod!=undefined){
        /** buscar libros de nivel y curso */
        libro = await Libro.find({colCod: gp.colCod, nivCod:gp.nivCod, curCod:gp.curCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod!=undefined && gp.nivCod==undefined && gp.curCod!=undefined&& gp.colCod!=undefined){
        /** buscar libros de grado y curso */
        libro = await Libro.find({colCod: gp.colCod, graCod:gp.graCod, curCod:gp.curCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod==undefined && gp.nivCod!=undefined && gp.curCod==undefined&& gp.colCod!=undefined){
        /** buscar nivel*/
        libro = await Libro.find({colCod: gp.colCod, nivCod:gp.nivCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod!=undefined && gp.nivCod==undefined && gp.curCod==undefined&& gp.colCod!=undefined){
        /** buscar libros de grado */
        libro = await Libro.find({colCod: gp.colCod, graCod:gp.graCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
    }
    else if(gp.graCod==undefined && gp.nivCod==undefined && gp.curCod!=undefined&& gp.colCod!=undefined){
        /** buscar libros de curso */
        console.log("sssssssss");
        libro = await Libro.find({colCod: gp.colCod, curCod:gp.curCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
    }
    else if(gp.graCod==undefined && gp.nivCod==undefined && gp.curCod==undefined&& gp.colCod!=undefined){
        libro = await Libro.find({colCod: gp.colCod})
        .populate('areCod')
        .populate('curCod')
        .populate('nivCod')
        .populate('graCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  );
        console.log("sssssssss");
        console.log(libro);
    }

    res.json(libro); 
};

LibroCtrl.createLibro = async (req, res) => {

    const gp = {
        libTtl  : req.body.libTtl,  // titulo
        libInt  : req.body.libInt,  // introduccion
        libDed  : req.body.libDed,  // descripcion
        libBib  : req.body.libBib,  // bibliografia
        libPre  : req.body.libPre,  // presentacion
        imgCod  : req.body.imgCod,  // imagen de portada
        areCod  : req.body.areCod,  // area  ( nucleo area)
        curCod  : req.body.curCod,  // curso ( nucleo curso)
        graCod  : req.body.graCod,  // grado
        nivCod  : req.body.nivCod,  // nivel
        colCod  : req.body.colCod,  // colegio
    }

    const newLibro=new Libro(gp);
    await newLibro.save();   // se crea un nuevo registro en el documento  
    res.json({status:200});

};

LibroCtrl.editLibro = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        areCod  : req.body.areCod,
        curCod  : req.body.curCod,
        nivCod  : req.body.nivCod,
        graCod  : req.body.graCod,
        libTtl  : req.body.libTtl,  // titulo
        libInt  : req.body.libInt,  // introduccion
        libDed  : req.body.libDed,  // descripcion
        libBib  : req.body.libBib,  // bibliografia
        libPre  : req.body.libPre,  // presentacion
        imgCod  : req.body.imgCod,  // imagen de portada
    }
    await Libro.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200});
};

LibroCtrl.deleteLibro = async (req,res)=> {

    var _id=req.params.id

    const EstadoDeshabilitado={
        estCod:'5e0a8a479644411040ebf293', //id del documento estado que se refiere a deshabilitar
    }

    await Libro.updateOne({_id:_id},{$set:EstadoDeshabilitado});
    res.json({status:200});
};

module.exports = LibroCtrl;