import React from 'react';
import { Switch } from 'react-router-dom';
import MyRoute from './MyRoute';
import Session from './../commons/Sessions/Session';
import Login from './../pages/Login/Login';
import Inicio from './../pages/Inicio/Inicio';
import Paquetes from './../pages/Paquetes/Paquetes';
import PaquetesV2 from './../pages/PaquetesV2/PaquetesV2';

const Routes = () => {
	return(
		<Switch>
			<MyRoute path="/" exact component={Inicio} isPrivate />
			<MyRoute path="/paquetes" component={Paquetes} isPrivate />
			<MyRoute path="/paquetesv2" component={PaquetesV2} isPrivate />
			<MyRoute path="/login" component={Login} />
			<MyRoute path="/logout" component={Session.logout} isPrivate />
			<MyRoute component={Login} />
		</Switch>
	)
}

export default Routes;