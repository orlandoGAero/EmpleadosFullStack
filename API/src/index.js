import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import db from './config/db.js'
const app = express();

// Configurar Puerto
const port = process.env.PORT || 5000;

// Conectar a la bd
db.authenticate()
    .then( () => console.log('Conectado a la bd') )
    .catch( error => console.log(error) )

// Habilitar cors
app.use(cors());
    
// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

app.use(express.json());

// Rutas
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});