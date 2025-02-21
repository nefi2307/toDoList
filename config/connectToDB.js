if (process.env.NODE_ENV != "production") {
    // cargar el archivo .env para las variables
    require("dotenv").config()
}
// importar las dependencias de mongoose
const mongoose = require('mongoose');
async function connectToDb()
{
    try{ // poonemos un try para en dado caso de error, contener la excepción
        await mongoose.connect(process.env.DB_URL);
        console.log('Conectado a la base de datos');
    }catch(e){ 
        console.log(e);
    }
    
//    console.log("alexis te amo"); mensaje para comprobar si se conecta o no
}

module.exports = connectToDb;