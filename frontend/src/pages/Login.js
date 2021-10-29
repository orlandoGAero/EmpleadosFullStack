import { useState, useEffect } from 'react';
import clientesAxios from '../config/axios';
import Cookies from 'universal-cookie';
import Error from '../components/Error.jsx';

const cookies = new Cookies();

const Login = () => {

  const [datos, setDatos] = useState({
    usuario: '',
    password: ''
  });
  const [error,setError] = useState(false);

  useEffect(() => {
    if(cookies.get("usuario")) {
      window.location.href = "./home";
    }
  }, [cookies]);

  const {usuario, password} = datos;

  const changeDatos = e => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const iniciarSesion = (e) => {
    e.preventDefault();
    clientesAxios.get(`/usuarios/${usuario}/${password}`)
    .then(response => response.data)
    .then(response => {
      if(response != null) {
        const {id_usuario,usuario,tipo} = response;
        cookies.set('id', id_usuario, {path: "/"});
        cookies.set('usuario', usuario, {path: "/"});
        cookies.set('tipo', tipo, {path: "/"});
        console.log(`Bienvenido ${usuario}`);
        window.location.href = "./home";
      } else {
        setError(true);
        console.log('Usuario y/o contraseña incorrectos');
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div class="row py-5 px-5">
      <div class="col-md-6 offset-md-3">
        <form
          onSubmit={iniciarSesion}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Cuenta
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="usuario"
              onChange={changeDatos}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={changeDatos}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
      {error ? <Error mensaje="Usuario y/o contraseña incorrectos"/> : null}
    </div>


  );
};

export default Login;
