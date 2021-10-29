import { Link, withRouter } from "react-router-dom";
import clientesAxios from '../config/axios';

const Usuario = ({ user }) => {
  const {
    id_usuario,
    usuario,
    password,
    tipo,
  } = user;
  
  const eliminarUsuario = async () => {

      if(window.confirm('Deseas eliminar')) {

        try {
          const resultado = await clientesAxios.delete(`/usuarios/${id_usuario}`)
          console.log(resultado);
          
        } catch (error) {
          console.log(error);
          
        }

      }

  }
  return (

    <tr>
      <td>{usuario}</td>
      <td>{password}</td>
      <td>{tipo}</td>
      <td>
        <Link
          to={`/usuarios/editar/${id_usuario}`}
          className="text-uppercase font-weight-bold me-md-3 text-white btn btn-info"
        >
          Editar
        </Link>
        <button
          type="button"
          className="text-uppercase font-weight-bold btn btn-danger"
          onClick={() => eliminarUsuario()}
        >
          Eliminar &times;
        </button>
      </td>
    </tr>
  );
};

export default Usuario;
