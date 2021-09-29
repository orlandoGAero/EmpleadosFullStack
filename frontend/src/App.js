import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BuscarEmpleados from "./pages/BuscarEmpleados";
import NuevoEmpleado from "./pages/NuevoEmpleado";
import EditarEmpleado from "./pages/EditarEmpleado";
import Login from "./pages/Login";
import clientesAxios from './config/axios';

function App() {

  const [empleados, setEmpleados] = useState([]);
  const [consultar, guardarConsultar] = useState(true) ;

  useEffect( () => {
    if(consultar) {
      const consultarApi = () => {
        clientesAxios.get('/empleados')
          .then( res => {
            setEmpleados(res.data);

            guardarConsultar(false);
          })
          .catch( error => console.log(error))
      }
      consultarApi();
    }
  },[consultar]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          component={() => (<Login /> )}
        />
        <Route
          exact
          path="/"
          component={() => (<BuscarEmpleados /> )}
        />
        <Route exact path="/nueva" component={() => <NuevoEmpleado />} />
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
        path="/editar/:id"
        render={ props => {
          const empleado = empleados.filter( empleado => empleado.id_empleado == props.match.params.id);
          console.log(empleado[0]);
          return(
            <EditarEmpleado
              empleado={empleado[0]}
              guardarConsultar={guardarConsultar}
            />
          );
        }}
      />}
      </Switch>
    </Router>
  );
}

export default App;
