const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');

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

    res.json({
      ok: true,
      mensaje: 'Imagen subuda correctamente'
    });
  });
});

module.exports = app;