import Empleado from "./Empleado";

const Empleados = ({empleados}) => {
    if(empleados.length == 0) return null;
    
    return (
        <div className="py-5">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleados.map(empleado => (
                            <Empleado
                                key={empleado.id_empleado}
                                empleado={empleado}
                            />                    
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default Empleados;