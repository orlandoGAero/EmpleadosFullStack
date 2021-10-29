import Empleado from "./Empleado";

const Empleados = ({empleados}) => {
    if(empleados.length == 0) return null;
    
    return (
        <div className="px-5">
            <h2 className="text-center">Lista Empleados</h2>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Operaciones</th>
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