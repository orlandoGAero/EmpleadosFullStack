import { Fragment } from "react";
import Cookies from 'universal-cookie';

import Menu from "../components/Menu";

const cookies = new Cookies();

const Home = () => {
    return (
        <Fragment>
            <Menu/>

            <div className="text-center mt-5">
                <h1>Bienvenido {cookies.get('usuario')}</h1>
            </div>
        </Fragment>
    );
}
 
export default Home;