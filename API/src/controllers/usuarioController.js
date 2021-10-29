import { Usuario } from "../models/Usuario.js";

const obtenerUsuario = async (req, res, next) => {

    const {usuario, password} = req.params;

    try {
        const user = await Usuario.findOne({where: {usuario,password}});
        res.json(user);
    } catch (error) {
        console.log(error);
        next();
    }
    
}


// Mostrar usuarios
const obtenerUsuarios = async(req, res, next) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Insertar Usuario
const crearUsuario = async(req,res,next) => {

    const {
        usuario,
        password,
        tipo
      } = req.body;

    const errores = [];

    if(usuario.trim() === '') {
        errores.push({mensaje: 'Ingresa un usuario'})
    }
    
    if(password.trim() === '') {
        errores.push({mensaje: 'Ingresa una contraseña'})
    }

    // Si todo es valido
    if(errores.length == 0) {
        try {
            await Usuario.create({
                usuario,
                password,
                tipo
            });
            
            res.json({mensaje: 'El usuario se agregó correctamente'});

        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error'});
            next();
        }
    } else {
        res.json(errores);
    }
}

// Actualizar Usuario
const actualizarUsuario = async(req,res,next) => {
    const { id_usuario } = req.params;

    const {
        usuario,
        password,
        tipo
      } = req.body;

    const errores = [];

    if(usuario.trim() === '') {
        errores.push({mensaje: 'Ingresa un usuario'})
    }
    
    if(password.trim() === '') {
        errores.push({mensaje: 'Ingresa una contraseña'})
    }

    // Si todo es valido
    if(errores.length == 0) {
        try {
            await Usuario.update({
                usuario,
                password,
                tipo
            },{
                where: {id_usuario}
            });
            
            res.json({estado: true, mensaje: 'El usuario se actualizó correctamente'});

        } catch (error) {
            res.json({error: 'Ocurrió un error'});
            next();
        }
    } else {
        res.json({estado: false,errores});
    }
}

// Eliminar usuario
const eliminarUsuario = async(req, res, next) => {
    const { id_usuario } = req.params;

    try {
        await Usuario.destroy({
            where: {id_usuario}
        });

        res.json({mensaje: 'El usuario se elimino correctamente'});
        
    } catch (error) {
        res.json({error: 'Ocurrió un error'});
        next();
    }
}

export {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}