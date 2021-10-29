import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Error from "../components/Error";
import clientesAxios from '../config/axios';

const NuevoEmpleado = () => {

    const getFecha = () => {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        let mes = fecha.getMonth()+1;
        let dia = fecha.getDate();
        if(dia<10)
            dia='0'+dia;
        if(mes<10)
            mes='0'+mes
        return `${anio}-${mes}-${dia}`;
    }

    const[empleado, setEmpleado] = useState({
        nombre_completo: '',
        correo_electronico: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: '',
        celular: '',
        fecha_de_ingreso: getFecha(),
        id_departamento: '',
    });
    const [error,setError] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const changeEmpleado = (e) => {
        setEmpleado({
            ...empleado, 
            [e.target.name]: e.target.value
        })

    }

    const {
        nombre_completo,
        correo_electronico,
        fecha_nacimiento,
        genero,
        telefono,
        celular,
        fecha_de_ingreso,
        id_departamento
    } = empleado;

    const crearEmpleado = async (e) => {
        e.preventDefault();

        if(
            nombre_completo == "" ||
            correo_electronico == "" ||
            fecha_nacimiento == "" ||
            genero == "" ||
            telefono == "" ||
            celular == "" ||
            fecha_de_ingreso == "" ||
            id_departamento == ""
        ) {
            setError(true);
            setMensaje("Ingresa todos los datos");
            return;
        }

        setError(false);

        const respuesta  = await clientesAxios.post('/empleados', empleado);

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
            <h1 className="mt-5 text-center">Nuevo Empleado</h1>
            <div className="container mb-5 py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <form 
                            className="row g-3"
                            onSubmit={crearEmpleado}
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
                                    <option value="1">Recursos Humanos</option>
                                    <option value="2">Desarrollo</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputFecha" className="form-label">
                                    Fecha Ingreso
                                </label>
                                <input type="text" 
                                    className="form-control" 
                                    id="inputFecha" 
                                    value={getFecha()} 
                                    readonly
                                    name="fecha_de_ingreso"
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary me-md-2">
                                    Registrar
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
};

export default NuevoEmpleado;
