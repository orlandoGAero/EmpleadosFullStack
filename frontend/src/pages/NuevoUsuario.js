import {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import Menu from '../components/Menu';
import clientesAxios from '../config/axios';

const NuevoUsuario = () => {

    const [user,setUsuario] = useState({
        usuario: '',
        password: '',
        tipo: ''
    });
    const [error,setError] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const {usuario, password, tipo} = user;

    const changeUsuario = e => {
        setUsuario({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const crearUsuario = async e => {
        e.preventDefault();

        if(usuario == "" || password == "" || tipo == "") {
            setError(true);
            setMensaje('Ingresa todos los datos');
            return;
        }

        setError(false);

        const respuesta = await clientesAxios.post('/usuarios', user);

        const data = await respuesta.data;

        if(data.mensaje) {
            setMensaje(data.mensaje);
            window.location.href = "/usuarios";
        } else {
            setError(true);
            setMensaje(data.error);
        }
    }

    return (
        <Fragment>
            
            <Menu/>

            <h1 className="mt-5 text-center">Nuevo Usuario</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <form
                            className="row g-3"
                            onSubmit={crearUsuario}
                        >
                           <div className="col-12">
                                <label 
                                    htmlFor="inputUsuario" 
                                    className="form-label">
                                    Usuario
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputUsuario"
                                    name="usuario" 
                                    onChange={changeUsuario}
                                />
                            </div> 
                           <div className="col-12">
                                <label 
                                    htmlFor="inputPassword" 
                                    className="form-label">
                                    Contraseña
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputPassword"
                                    name="password" 
                                    onChange={changeUsuario}
                                />
                            </div> 
                            <div className="col-12">
                                <label 
                                    htmlFor="Tipo" 
                                    className="form-label"
                                >
                                    Tipo
                                </label>
                            </div>
                            <div className="col-12">
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="tipo"
                                        id="admin" 
                                        value="admin"
                                        onChange={changeUsuario}
                                    />
                                    <label 
                                        className="form-check-label" 
                                        htmlFor="admin">Administrador</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="tipo" 
                                        id="normal" 
                                        value="normal"
                                        onChange={changeUsuario}
                                    />
                                    <label 
                                    className="form-check-label" 
                                    htmlFor="normal">Normal</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary me-md-2">
                                    Registrar
                                </button>
                                <Link to={'/usuarios'} className="btn btn-light">
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
 
export default NuevoUsuario;