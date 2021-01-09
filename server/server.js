require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

//importar rutas de usuario
app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafe', 
  { useNewUrlParser: true, useCreateIndex: true }, 
  (err, res) => {
  if (err) throw err;
    console.log('Base de datos en linea'); 
});

app.listen(process.env.PORT, () => console.log("Escuchando puerto", process.env.PORT));