
// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  urlDB = 'mongodb+srv://javi:<3MiYsEFH3AMqH6I0>@cluster0.wkr6a.mongodb.net/test';
}

process.env.URLDB = urlDB;
