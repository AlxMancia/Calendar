const express = require('express');
const dbConnection = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//Crear server de express
const app = express();


//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directoro publico
app.use( express.static('public') );


// Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



//TODO: CRUD: eventos


//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor en puerto: ${process.env.PORT}`)
})