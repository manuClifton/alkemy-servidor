 const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    contenido: {
        type: String,
        require: true,
        trim: true
    },
    fecha: {
        type: Date,
        require: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', PostSchema); 