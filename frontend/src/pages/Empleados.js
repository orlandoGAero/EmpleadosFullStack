import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Menu from "../components/Menu";
import BuscarEmpleados from "./BuscarEmpleados";
import ListaEmpleados from "./ListaEmpleados";
import clientesAxios from "../config/axios";

const cookies = new Cookies();

const Empleados = () => {

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        if(!cookies.get("usuario")) {
            window.location.href = "./";
        }
        const url = '/empleados';

        clientesAxios.get(url)
        .then(respuesta => {
            setEmpleados(respuesta.data);
        }) 
    }, [cookies]);

    return (
        <Fragment>

            <Menu/> 

            <div className="container-fluid my-5 d-flex justify-content-end">
                <Link to={'/empleados/crear'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">
                    Registrar Empleado
                </Link>
            </div>

            <BuscarEmpleados setEmpleados={setEmpleados}/>

            <ListaEmpleados empleados={empleados} />

        </Fragment>
    );
}
 
export default Empleados;