// import { Empresa } from '../models/Empresa.js';
import { Empleado } from '../models/Empleado.js';
import pkg from 'sequelize';
const { QueryTypes } = pkg;
import db from '../config/db.js';

// Mostrar empleados
const obtenerEmpleados = async(req, res, next) => {
    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtener un empleado
const obtenerEmpleado = async(req, res, next) => {
    const { id_empleado } = req.params;

    try {
        const empleado = await Empleado.findOne({where: {id_empleado}});
        res.json(empleado);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtener empleado por empresa
const obtenerEmpleadoByEmpresa = async(req, res, next) => {
    const { id_empresa } = req.params;

    try {
        const empleados = await db.query(`SELECT e.* FROM empleados e INNER JOIN departamentos d ON d.id_departamento=e.id_departamento INNER JOIN empresas em ON em.id_empresa=d.id_empresa WHERE em.id_empresa = ${id_empresa}`, { type: QueryTypes.SELECT });

        res.json(empleados);
        
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtener empleado por departamento
const obtenerEmpleadoByDepartamento = async(req, res, next) => {

    const { id_departamento } = req.params;

    try {
        const empleados = await db.query(`SELECT e.* FROM empleados e INNER JOIN departamentos d ON d.id_departamento=e.id_departamento WHERE d.id_departamento = ${id_departamento};`, { type: QueryTypes.SELECT });

        res.json(empleados);
        
    } catch (error) {
        console.log(error);
        next();
    }
}

// Obtener empleado por nombre
const obtenerEmpleadoByNombre = async(req, res, next) => {

    const { nombre } = req.params;

    try {
        const empleados = await db.query(`SELECT * FROM empleados WHERE nombre_completo LIKE '%${nombre}%';`, { type: QueryTypes.SELECT });

        res.json(empleados);
        
    } catch (error) {
        console.log(error);
        next();
    }
}

// Insertar Empleado
const crearEmpleado = async(req,res,next) => {

    const {
        nombre_completo,
        correo_electronico,
        fecha_nacimiento,
        genero,
        telefono,
        celular,
        fecha_de_ingreso,
        id_departamento
      } = req.body;

    const errores = [];

    if(nombre_completo.trim() === '') {
        errores.push({mensaje: 'Ingresa un nombre'})
    }
    
    if(correo_electronico.trim() === '') {
        errores.push({mensaje: 'Ingresa un correo'})
    }
    
    if(fecha_nacimiento.trim() === '') {
        errores.push({mensaje: 'Ingresa una fecha de nacimiento'})
    }

    // Si todo es valido
    if(errores.length == 0) {
        try {
            await Empleado.create({
                nombre_completo,
                correo_electronico,
                fecha_nacimiento,
                genero,
                telefono,
                celular,
                fecha_de_ingreso,
                id_departamento
            });
            
            res.json({mensaje: 'El empleado se agregó correctamente'});

        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error'});
            next();
        }
    } else {
        res.json(errores);
    }
}

// Actualizar Empleado
const actualizarEmpleado = async(req,res,next) => {
    const { id_empleado } = req.params;

    const {
        nombre_completo,
        correo_electronico,
        fecha_nacimiento,
        genero,
        telefono,
        celular,
        id_departamento
      } = req.body;

    const errores = [];

    if(nombre_completo.trim() === '') {
        errores.push({mensaje: 'Ingresa un nombre'})
    }
    
    if(correo_electronico.trim() === '') {
        errores.push({mensaje: 'Ingresa un correo'})
    }
    
    if(fecha_nacimiento.trim() === '') {
        errores.push({mensaje: 'Ingresa una fecha de nacimiento'})
    }

    // Si todo es valido
    if(errores.length == 0) {
        try {
            await Empleado.update({
                nombre_completo,
                correo_electronico,
                fecha_nacimiento,
                genero,
                telefono,
                celular,
                id_departamento
            },{
                where: {id_empleado}
            });
            
            res.json({mensaje: 'El empleado se actualizó correctamente'});

        } catch (error) {
            console.log(error);
            res.json({error: 'Ocurrió un error'});
            next();
        }
    } else {
        res.json(errores);
    }
}

// Eliminar empleado
const eliminarEmpleado = async(req, res, next) => {
    const { id_empleado } = req.params;

    try {
        await Empleado.destroy({
            where: {id_empleado}
        });

        res.json({mensaje: 'El empleado se elimino correctamente'});
        
    } catch (error) {
        console.log(error);
        res.json({error: 'Ocurrió un error'});
        next();
    }
}

export {
    crearEmpleado,
    obtenerEmpleados,
    obtenerEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerEmpleadoByEmpresa,
    obtenerEmpleadoByDepartamento,
    obtenerEmpleadoByNombre
}
