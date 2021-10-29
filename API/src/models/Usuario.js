import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Usuario = db.define('usuarios', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    usuario: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    }
});