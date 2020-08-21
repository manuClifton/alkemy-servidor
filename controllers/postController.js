const Post = require('../models/Post');
const { validationResult } = require('express-validator');

exports.crearPost = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){ // si hay errores los muestro
        console.log('hya un error en el postman')
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
          //crea el posteo
        let posteo = new Post(req.body);
        //guarda el posteo
        await posteo.save();
        //Mensaje
        res.send('Posteo creado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


//Obtiene todos los posts
exports.obtenerPosts = async (req, res) =>{

    try {
        const posteos = await Post.find().sort({fecha: -1});
        res.json({posteos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el get')
    }
}

//Actualizar un post
exports.actualizarPost = async (req, res) =>{

    const { titulo, contenido } = req.body;

    const nuevoPost = {};

    if(titulo){
        nuevoPost.titulo = titulo;
    }
    if(contenido){
        nuevoPost.contenido = contenido;
    }

    try {
        //revisar id
        console.log(req.params.id);
        let posteo = await Post.findById(req.params.id);
        //verificar si existe
        if(!posteo){
            return res.status(404).json({ msg: 'No se econtro el Post'})
        }
        //actualizar
        posteo = await Post.findByIdAndUpdate( {_id: req.params.id}, {$set: nuevoPost}, {new: true} );
        res.json({posteo});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error PUT en el servidor')
    }
}

//Elimina un posteo por su ID
exports.eliminarPost = async (req,res) =>{

    //Obtener el proyecto
    
    try {
        //Revisar el ID
        let posteo = await Post.findById(req.params.id);

        //verificar si existe
        if(!posteo){
            return res.status(404).json({ msg: 'No se econtro el Post'})
        }

        //Eliminar
        await Post.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Posteo eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de DELETE en el servidor')
    }
}