const express =require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');

app.get('/productos', verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        productos
      });
    })

});

app.get('/producto/:id', verificaToken, (req, res) => { 
  let id = req.params.id;
  Producto.findById(id) 
  .populate('usuario', 'nombre email')
  .populate('categoria', 'descripcion')
  .exec((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no existe'
        }
      });
    }

    res.json({
      ok: true,
      producto: productoDB
    });
  });
});

// Buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
  let termino = req.params.termino;
  // crea una expresion regular basada en termino, la i = insensible a mayusculas
  let regex = new RegExp(termino, 'i'); 

  Producto.find({ nombre: regex })
    .populate('categoria', 'nombre')
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        productos
      })
    });

});

app.post('/producto/', verificaToken, (req, res) => {
 
  let body = req.body;

  let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,        
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.status(201).json({
      ok: true,
      producto: productoDB
    });
  });  
});

app.put('/producto/:id', verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let actuProducto = {
    nombre: body.nombre,
    precioUni: body.precioUni,
    categoria: body.categoria,
    disponible: body.disponible,
    descripcion: body.descripcion,
  };

  Producto.findByIdAndUpdate(id, actuProducto, {new: true, runValidators: true,  useFindAndModify: false }, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      producto: productoDB
    });
  });
  
});

// pasar disponible a false - el producto ha sido desabilitado
app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;
  let cambiaEstado = {
    disponible: false
  }

  Producto.findByIdAndUpdate(id, cambiaEstado, {new: true,  useFindAndModify: false}, (err, productoDeshabilitado) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productoDeshabilitado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: ' El ID no existe'
        }
      });
    }

    res.json({
      ok: true,
      producto: productoDeshabilitado,
      mensaje: 'Producto deshabilitado'
    })
  });
  
});

module.exports = app;