import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Empleados from "./pages/Empleados";
import NuevoEmpleado from "./pages/NuevoEmpleado";
import EditarEmpleado from "./pages/EditarEmpleado";
import Usuarios from "./pages/Usuarios";
import NuevoUsuario from "./pages/NuevoUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import clientesAxios from './config/axios';

function App() {

  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [consultar, guardarConsultar] = useState(true) ;

  useEffect( () => {
    if(consultar) {
      const consultarApi = async () => {

        const peticiones = [];

        peticiones.push(clientesAxios.get('/empleados'));
        peticiones.push(clientesAxios.get('/usuarios'));

        try {
          const resultado = await Promise.all(peticiones);

          setEmpleados(resultado[0].data);
          setUsuarios(resultado[1].data);
          guardarConsultar(false);
          
        } catch (error) {
          console.log(error)
        }
      }
      consultarApi();
    }
  },[consultar]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (<Login /> )}
        />
        <Route
          exact
          path="/home"
          component={() => (<Home /> )}
        />
        <Route
          exact
          path="/empleados"
          component={() => (<Empleados /> )}
        />
        <Route exact path="/empleados/crear" component={() => <NuevoEmpleado />} />
        {/* <Route 
        exact
        path="/cita/:id"
        render={ props => {
          const cita = citas.filter( cita => cita._id === props.match.params.id);

          return( 
            <Cita 
              cita={cita[0]}
              guardarConsultar={guardarConsultar}
            />
          )
        }}
      />*/
      <Route
        exact
        path="/empleados/editar/:id"
        render={ props => {
          const empleado = empleados.filter( empleado => empleado.id_empleado == props.match.params.id);
          return(
            <EditarEmpleado
              empleado={empleado[0]}
              guardarConsultar={guardarConsultar}
            />
          );
        }}
      />}
      {/* usuarios */}
       <Route
          exact
          path="/usuarios"
          component={() => (<Usuarios/> )}
        />
        <Route exact path="/usuarios/crear" component={() => <NuevoUsuario />} />
        <Route
          exact
          path="/usuarios/editar/:id"
          render={ props => {
            const usuario = usuarios.filter( user => user.id_usuario == props.match.params.id);

            return(
              <EditarUsuario
                usuario={usuario[0]}
                guardarConsultar={guardarConsultar}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
