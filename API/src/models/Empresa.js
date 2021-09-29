import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Empresa = db.define('empresa', {
    id_empresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
})