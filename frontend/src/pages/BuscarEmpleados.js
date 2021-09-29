import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import clientesAxios from '../config/axios';
import Empleados from "./Empleados";


const BuscarEmpleados = () => {

    const [criterio, setCriterio] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [empleados, setEmpleados] = useState([]);
    
    const cambiarBusqueda = e => {
        setBusqueda(e.target.value);
        setCriterio('');
    }

    const cambiarCriterio = e => {
        setCriterio(e.target.value);
    }

    const buscarEmpleados = e => {
        e.preventDefault();
        let url;

        switch (busqueda) {
            case 'empresa':
                url = `/empresas/${criterio}/empleados`;
                break;
            case 'departamento':
                url = `/departamentos/${criterio}/empleados`;
                break;
            case 'nombre':
                url = `/empleados/buscar/${criterio}`;
                break;
        
            default:
                break;
        }

        clientesAxios.get(url)
            .then(respuesta => {
                setEmpleados(respuesta.data);
            })   
    }
    

    return ( 
        <Fragment>
            <div className="row  py-5 px-5">
                <div className="col-auto">
                    <label class="h1">Buscar Por:</label>
                </div>
                <div className="col-md-4">
                    <select 
                        class="form-select form-select-lg mb-3" 
                        aria-label=".form-select-lg example"
                        name="buscar"
                        onChange={cambiarBusqueda}
                    >
                        <option selected>Elige...</option>
                        <option value="empresa">Empresa</option>
                        <option value="departamento">Departamento</option>
                        <option value="nombre">Nombre</option>
                    </select>
                </div>
                <div className="col-md-4">
                    {
                        (busqueda == 'empresa') 
                        ?
                            <select 
                                class="form-select form-select-lg mb-3" 
                                aria-label=".form-select-lg example"
                                name="empresa"
                                onChange={cambiarCriterio}
                            >
                                <option selected>Elige...</option>
                                <option value="1">Empresa A</option>
                                <option value="2">Empresa B</option>
                                <option value="3">Empresa C</option>
                            </select>
                            
                        : 
                        (busqueda == 'departamento')
                        ?
                            <select 
                                class="form-select form-select-lg mb-3" 
                                aria-label=".form-select-lg example"
                                name="departamento"
                                onChange={cambiarCriterio}
                            >
                                <option selected>Elige...</option>
                                <option value="1">Recursos Humanos</option>
                                <option value="2">Desarrollo</option>
                            </select>
                        :
                            <input 
                                type="text" 
                                className="form-control-lg" 
                                name="nombre"
                                onChange={cambiarCriterio}
                            />
                    }
                </div>
                <div className="col-auto">
                    <button 
                        type="button" 
                        className="btn btn-lg btn-primary"
                        onClick={buscarEmpleados}
                    >
                        Buscar
                    </button>
                </div>
            </div>  
            <div className="row py-5">
                <div className="col-12 mb-5 d-flex justify-content-center">
                    <Link to={'/nueva'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">
                        Registrar Empleado
                    </Link>
                </div>
            </div>
            <Empleados empleados={empleados} />
        </Fragment>
     );
}
 
export default BuscarEmpleados;