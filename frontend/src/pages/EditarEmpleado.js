import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import Error from '../components/Error';
import clientesAxios from '../config/axios';

const EditarEmpleado = (props) => {

    // console.log(props.empleado);
    // console.log(props.empleado.id_empleado);
// return null;
    const {
            id_empleado,
            nombre_completo,
            correo_electronico,
            fecha_nacimiento,
            telefono,
            celular,
            genero,
            id_departamento
        } = props.empleado;

    const [empleadoBd,setEmpleadoBd] = useState({
        id_empleado,
        nombre_completo,
        correo_electronico,
        fecha_nacimiento,
        telefono,
        celular,
        genero,
        id_departamento
    });

    const [error,setError] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const changeEmpleado = (e) => {
        setEmpleadoBd({
            ...empleadoBd, 
            [e.target.name]: e.target.value
        })
    }


    const editarEmpleado = async e =>  {
        e.preventDefault();

        if(
            nombre_completo == "" ||
            correo_electronico == "" ||
            fecha_nacimiento == "" ||
            genero == "" ||
            telefono == "" ||
            celular == "" ||
            id_departamento == ""
        ) {
            setError(true);
            setMensaje("Ingresa todos los datos");
            return;
        }

        setError(false);

        const respuesta  = await clientesAxios.put(`empleados/${id_empleado}`, empleadoBd)

        const data = await respuesta.data;

        if(data.mensaje) {
            setMensaje(data.mensaje);
            window.location.href = "/empleados";
        } else {
            setError(true);
            setMensaje(data.error);
        }

    }
    
    return (
        <Fragment>
            <Menu/>
            <h1 className="mt-5 text-center">Editar Empleado</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <form 
                            className="row g-3"
                            onSubmit={editarEmpleado}
                            >
                            <div className="col-12">
                                <label 
                                    htmlFor="inputNombre" 
                                    className="form-label">
                                    Nombre Completo
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputNombre"
                                    name="nombre_completo" 
                                    value={empleadoBd.nombre_completo}
                                    onChange={changeEmpleado}
                                />
                            </div>
                            <div className="col-md-6">
                                <label 
                                    htmlFor="inputEmail4" 
                                    className="form-label">
                                    Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="inputEmail4"
                                    name="correo_electronico" 
                                    value={empleadoBd.correo_electronico}
                                    onChange={changeEmpleado}
                                />
                            </div>
                            <div className="col-md-6">
                                <label 
                                    htmlFor="inputNacimiento" 
                                    className="form-label">
                                    Fecha Nacimiento
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputNacimiento"
                                    name="fecha_nacimiento" 
                                    value={empleadoBd.fecha_nacimiento}
                                    onChange={changeEmpleado}
                                />
                            </div>
                            <div className="col-12">
                                <label 
                                    htmlFor="Genero" 
                                    className="form-label"
                                >
                                    Género
                                </label>
                            </div>
                            <div className="col-12">
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="genero"
                                        id="generoFem" 
                                        value="Femenino"
                                        checked={(empleadoBd.genero == 'Femenino') ? true : false }
                                        onChange={changeEmpleado}
                                    />
                                    <label 
                                        className="form-check-label" 
                                        htmlFor="generoFem">Femenino</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="genero" 
                                        id="generoMas" 
                                        value="Masculino"
                                        checked={(empleadoBd.genero == 'Masculino') ? true : false }
                                        onChange={changeEmpleado}
                                    />
                                    <label 
                                    className="form-check-label" 
                                    htmlFor="generoMas">Masculino</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="genero" 
                                        id="generoOtro" 
                                        value="Otro"
                                        checked={(empleadoBd.genero == 'Otro') ? true : false }
                                        onChange={changeEmpleado}
                                    />
                                    <label 
                                        className="form-check-label" 
                                        htmlFor="generoOtro">Otro</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputTelefono" className="form-label">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputTelefono"
                                    name="telefono"
                                    maxLength="10"
                                    value={empleadoBd.telefono}
                                    onChange={changeEmpleado}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCelular" className="form-label">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputCelular"
                                    name="celular"
                                    maxLength="10"
                                    value={empleadoBd.celular}
                                    onChange={changeEmpleado}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDepartamento" className="form-label">
                                    Departamento
                                </label>
                                <select 
                                    id="inputDepartamento" 
                                    className="form-select"
                                    name="id_departamento"
                                    onChange={changeEmpleado}
                                >
                                    <option selected>Elige...</option>
                                    <option 
                                        selected={(empleadoBd.id_departamento == '1') ? true : false }
                                        value="1">Recursos Humanos</option>
                                    <option 
                                        selected={(empleadoBd.id_departamento == '2') ? true : false }
                                        value="2">Desarrollo</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary me-md-2">
                                    Editar
                                </button>
                                <Link to={'/empleados'} className="btn btn-light">
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                    {error ? <Error mensaje={mensaje} /> : null}
                </div>
            </div>
        </Fragment>
    );
}
 
export default EditarEmpleado;