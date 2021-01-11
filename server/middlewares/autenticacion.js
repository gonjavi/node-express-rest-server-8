const jwt = require('jsonwebtoken');

// Verifficar token
let verificaToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    // sino hay error la info es correcta - el decoded contiene la info del usuario
    if(err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido'
        }
      });
    }    

    req.usuario = decoded.usuario;
    // ejecuto el next para que continue el programa
    next();
  }); 
};

// verifica admin rol
let verificaAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    res.json({
      ok: true,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }
  
};

// verifica token en img
let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    // sino hay error la info es correcta - el decoded contiene la info del usuario
    if(err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido'
        }
      });
    }    

    req.usuario = decoded.usuario;
    // ejecuto el next para que continue el programa
    next();
  });
}

module.exports = {
  verificaToken,
  verificaAdmin_Role,
  verificaTokenImg,
}