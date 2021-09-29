import { Fragment, useState } from "react";
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

    const changeEmpleado = (e) => {
        setEmpleado({
            ...empleado, 
            [e.target.name]: e.target.value
        })

    }

    const crearEmpleado = (e) => {
        e.preventDefault();

        clientesAxios.post('/empleados', empleado)
            .then( respuesta => {
                console.log(respuesta);

                // props.guardarConsultar(true);

                // props.history.push("/");
            })

    }

    return (
        <Fragment>
        <h1 className="mt-5 text-center">Nuevo Empleado</h1>
        <div className="container mt-5 py-5">
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
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default NuevoEmpleado;
