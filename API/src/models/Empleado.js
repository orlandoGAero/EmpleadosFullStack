import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Empleado = db.define('empleados', {
    id_empleado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre_completo: {
        type: Sequelize.STRING
    },
    correo_electronico: {
        type: Sequelize.STRING
    },
    fecha_nacimiento: {
        type: Sequelize.DATE
    },
    genero: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    celular: {
        type: Sequelize.STRING
    },
    fecha_de_ingreso: {
        type: Sequelize.DATE
    },
    id_departamento: {
        type: Sequelize.INTEGER
    },
});
