const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400)
      .json({
        ok: false,
        err: {
          message: 'No se ha seleccionado ningun archivo'
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
    })
  }

  archivo.mv(`uploads/${archivo.name}`, (err) => {
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