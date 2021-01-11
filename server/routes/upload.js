const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {
  let tipo = req.params.tipo;
  let id = req.params.id

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400)
      .json({
        ok: false,
        err: {
          message: 'No se ha seleccionado ningun archivo'
        }
    });
  }

  // validar tipo
  let tiposvalidos = ['productos', 'usuarios'];
  
  if (tiposvalidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Los tipos permitidos son ' + tiposvalidos.join(', ' )        
      }
    });
  }

  let archivo = req.files.archivo;

  // extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  let nombreArchivoSeparado = archivo.name.split('.');
  let extension = nombreArchivoSeparado[1];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Las extensiones permitidas son ' + extensionesValidas.join(', ' ),
        ext: extension
      }
    });
  }

  // cambiar nombre del archivo
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        err
      });
    // imagen cargada  
   imagenUsuario(id, res, nombreArchivo);
  });
});

function imagenUsuario(id, res, nombreArchivo) {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no existe'
        }
      });
    }

    let pathImagen = path.resolve(__dirname, `../../uploads/usuarios/${usuarioDB.img}`);
    // para ver si ya existe imagen, si existe borrela
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }

    usuarioDB.img = nombreArchivo;
    usuarioDB.save((err, usuarioguardado) => {
      res.json({
        ok: true,
        usuario: usuarioguardado,
        img: nombreArchivo
      });
    });

  });
}

function imagenProducto() {}

module.exports = app;