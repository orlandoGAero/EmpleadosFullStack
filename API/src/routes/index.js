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


router.get('/empleados', obtenerEmpleados);
router.get('/empleados/:id_empleado', obtenerEmpleado);
router.get('/empresas/:id_empresa/empleados', obtenerEmpleadoByEmpresa);
router.get('/departamentos/:id_departamento/empleados', obtenerEmpleadoByDepartamento);
router.get('/empleados/buscar/:nombre', obtenerEmpleadoByNombre);
router.post('/empleados', crearEmpleado);
router.put('/empleados/:id_empleado', actualizarEmpleado);
router.delete('/empleados/:id_empleado', eliminarEmpleado);

export default router;