import {Fragment, useState } from 'react';
import Error from '../components/Error';
import clientesAxios from '../config/axios';


const BuscarEmpleados = ({setEmpleados}) => {

    const [criterio, setCriterio] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(false);

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

        if(busqueda == "" || criterio == "") {
            setError(true);
            return;
        }

        setError(false);

        clientesAxios.get(url)
            .then(respuesta => {
                setEmpleados(respuesta.data);
            })   
    }

    return ( 
        <Fragment>
            <div className="row py-5 px-5">
                <div className="col-auto">
                    <label class="h3">Buscar Por:</label>
                </div>
                <div className="col-md-4">
                    <select 
                        class="form-select form-select mb-3" 
                        aria-label=".form-select"
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
                                class="form-select form-select mb-3" 
                                aria-label=".form-select"
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
                                class="form-select form-select mb-3" 
                                aria-label=".form-select"
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
                                className="form-control" 
                                name="nombre"
                                onChange={cambiarCriterio}
                            />
                    }
                </div>
                <div className="col-auto">
                    <button 
                        type="button" 
                        className="btn btn btn-primary"
                        onClick={buscarEmpleados}
                    >
                        Buscar
                    </button>
                </div>
            {error ? <Error mensaje="Ingresa todos los criterios"/> : null}
            </div>  
        </Fragment>
     );
}
 
export default BuscarEmpleados;