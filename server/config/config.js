
// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
// 60 segundos  60 minutos  24 horas 30 dias
process.env.CADUCIDAD_TOKEN = '48h';
// seed de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
// Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  urlDB = process.env.MONGO_URI; //MONGO_URI es creada en heroku y el valor es aisgnado
}

process.env.URLDB = urlDB;
