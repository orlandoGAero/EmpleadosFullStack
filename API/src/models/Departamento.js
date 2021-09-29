import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Departamento = db.define('departamento', {
    id_departamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    id_empresa: {
        type: Sequelize.INTEGER
    }
});

