const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { check } = require('express-validator');

//Crea un post
// api/posts
router.post('/', 
    [
        check('titulo', 'El titulo del post es obligatorio').not().isEmpty(),
        check('contenido', 'El contenido del post es obligatorio').not().isEmpty()
    ],
    postController.crearPost
);

//Obtener todos los post de un usuario
router.get('/',
    postController.obtenerPosts
);
 
//Actualizar post via ID
router.put('/:id',
    [
        check('titulo', 'El titulo del post es obligatorio').not().isEmpty(),
        check('contenido', 'El contenido del post es obligatorio').not().isEmpty()
    ],
    postController.actualizarPost
);

//Eliminar un proyecto
router.delete('/:id',
    postController.eliminarPost
); 


module.exports = router;
