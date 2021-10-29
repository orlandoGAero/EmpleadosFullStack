import express from 'express';
const router = express.Router();

import {
    crearEmpleado,
    obtenerEmpleados,
    obtenerEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerEmpleadoByEmpresa,
    obtenerEmpleadoByDepartamento,
    obtenerEmpleadoByNombre
} from '../controllers/empleadoController.js';
import { 
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario
} from '../controllers/usuarioController.js';

// Empleados
router.get('/empleados', obtenerEmpleados);
router.get('/empleados/:id_empleado', obtenerEmpleado);
router.get('/empresas/:id_empresa/empleados', obtenerEmpleadoByEmpresa);
router.get('/departamentos/:id_departamento/empleados', obtenerEmpleadoByDepartamento);
router.get('/empleados/buscar/:nombre', obtenerEmpleadoByNombre);
router.post('/empleados', crearEmpleado);
router.put('/empleados/:id_empleado', actualizarEmpleado);
router.delete('/empleados/:id_empleado', eliminarEmpleado);

// Usuarios
router.get('/usuarios', obtenerUsuarios);
router.get('/usuarios/:usuario/:password', obtenerUsuario);
router.post('/usuarios', crearUsuario);
router.put('/usuarios/:id_usuario', actualizarUsuario);
router.delete('/usuarios/:id_usuario', eliminarUsuario);


export default router;