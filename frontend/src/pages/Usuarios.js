import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Menu from "../components/Menu";
import ListaUsuarios from "./ListaUsuarios";
import clientesAxios from "../config/axios";

const cookies = new Cookies();

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(async () => {
        if(!cookies.get("usuario")) {
            window.location.href = "./";
        }

        const url = '/usuarios';

        const respuesta = await clientesAxios.get(url);

        setUsuarios(respuesta.data)

    });

    return ( 
        <Fragment>

            <Menu/> 

            <div className="container-fluid my-5 d-flex justify-content-end">
                <Link to={'/usuarios/crear'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">
                    Registrar Usuario
                </Link>
            </div>

            <ListaUsuarios usuarios={usuarios} />

        </Fragment>
    );
}
 
export default Usuarios;