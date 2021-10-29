import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';

import './Menu.css';

const cookies = new Cookies();

const Menu = () => {

    const [menu,setMenu] = useState(false);

    const cerrarSesion = () => {
        cookies.remove('id', {path: "/"});
        cookies.remove('usuario', {path: "/"});
        cookies.remove('tipo', {path: "/"});
        window.location.href = "./";
    }

    return (
        <>
            <div className="d-flex justify-content-between p-3 bg-info">
                <div className="d-flex align-items-center menu">
                    {menu
                        ?
                        <FontAwesomeIcon icon={faTimes} size="2x" inverse onClick={e => setMenu(false)}/>
                        :
                        <FontAwesomeIcon icon={faBars} size="2x" inverse onClick={e => setMenu(true)}/>
                    }
                </div>
                <div className="fw-bold fs-1 text-white">Nombre Empresa</div>
            </div>
            <nav className={menu ? 'mostrar' : null}>
                <p className="mb-5 text-white text-center h4">{cookies.get('usuario')}</p>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/empleados">Empleados</a></li>
                    {
                        cookies.get('tipo') == "admin"
                        ?
                            <li><a href="/usuarios">Usuarios</a></li>
                        : null
                    }
                    <li className="mt-5 text-end"><a href="#" onClick={cerrarSesion}>Cerrar Sesión</a></li>
                </ul>
            </nav>
        </>
    );
}
 
export default Menu;