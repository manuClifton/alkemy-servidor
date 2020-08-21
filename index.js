const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors'); 

//creo el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//habilitar cors por cliente y servidor serparado
app.use(cors());
/* app.use(cors({origin: 'https://alkemy-challenge-server.herokuapp.com/'}));
app.options("*", cors()); */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//habilitar express.JSON
app.use(express.json({ extended: true }));

//puerto de la APP
const port = process.env.PORT || 4000;

// importo las rutas
app.use('/api/posts', require('./routes/posts'));

app.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})