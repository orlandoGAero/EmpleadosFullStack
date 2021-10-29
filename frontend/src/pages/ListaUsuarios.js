import Usuario from "./Usuario";

const Usuarios = ({usuarios}) => {
    if(usuarios.length == 0) return null;
    
    return (
        <div className="px-5">
            <h2 className="text-center">Lista Usuarios</h2>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(user => (
                            <Usuario
                                key={user.id_usuario}
                                user={user}
                            />                    
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default Usuarios;