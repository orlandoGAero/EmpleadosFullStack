import { Link, withRouter } from "react-router-dom";
import clientesAxios from '../config/axios';

const Empleado = ({ empleado }) => {
  const {
    id_empleado,
    nombre_completo,
    correo_electronico,
    fecha_nacimiento,
    telefono,
  } = empleado;
  
  const eliminarEmpleado = id => {
      console.log(id);
      if(window.confirm('Deseas elminar')) {

        clientesAxios.delete(`/empleados/${id_empleado}`)
        .then( resultado => {
            // props.guardarConsultar(true);
            console.log(resultado);
            // props.history.push("/");
        })
        .catch( error => { 
            console.log(error);
        })

      }

  }
  return (

    <tr>
      <td>{nombre_completo}</td>
      <td>{correo_electronico}</td>
      <td>{fecha_nacimiento}</td>
      <td>{telefono}</td>
      <td>
        <Link
          to={`/empleados/editar/${id_empleado}`}
          className="text-uppercase font-weight-bold me-md-3 text-white btn btn-info"
        >
          Editar
        </Link>
        <button
          type="button"
          className="text-uppercase font-weight-bold btn btn-danger"
          onClick={() => eliminarEmpleado(id_empleado)}
        >
          Eliminar &times;
        </button>
      </td>
    </tr>
  );
};

export default Empleado;
