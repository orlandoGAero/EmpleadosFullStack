import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import Error from '../components/Error';
import clientesAxios from '../config/axios';

const EditarUsuario = (props) => {

    const {
        id_usuario,
        usuario,
        password,
        tipo
        } = props.usuario;

    const [usuarioBd,setUsuarioBd] = useState({
        id_usuario,
        usuario,
        password,
        tipo,
    });

    const [error,setError] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const changeUsuario = (e) => {
        setUsuarioBd({
            ...usuarioBd, 
            [e.target.name]: e.target.value
        })
    }

    const editarUsuario = async e =>  {
        e.preventDefault();

        if(
            usuario == "" ||
            password == "" ||
            tipo == ""
        ) {
            setError(true);
            setMensaje("Ingresa todos los datos");
            console.log('mensaje',mensaje);
            return;
        }

        setError(false);

        const respuesta  = await clientesAxios.put(`usuarios/${id_usuario}`, usuarioBd)

        const data = await respuesta.data;

        if(data.estado) {
            setMensaje(data.mensaje);
            window.location.href = "/usuarios";
        } else {
            setError(true);
            setMensaje(data.errores[0].mensaje);
        }

    }
    
    return (
        <Fragment>
            <Menu/>
            <h1 className="mt-5 text-center">Editar Usuario</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <form 
                            className="row g-3"
                            onSubmit={editarUsuario}
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
                                    value={usuarioBd.usuario}
                                    onChange={changeUsuario}
                                />
                            </div> 
                           <div className="col-12">
                                <label 
                                    htmlFor="inputPassword" 
                                    className="form-label">
                                    Contrase??a
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputPassword"
                                    name="password" 
                                    value={usuarioBd.password}
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
                                        checked={(usuarioBd.tipo == 'admin') ? true : false }
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
                                        checked={(usuarioBd.tipo == 'normal') ? true : false }
                                    />
                                    <label 
                                    className="form-check-label" 
                                    htmlFor="normal">Normal</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary me-md-2">
                                    Editar
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
 
export default EditarUsuario;