if (process.env.NODE_ENV != "production") {
    // cargar el archivo .env para las variables
    require("dotenv").config()
}
// importar las dependencias
const express = require('express')
const connectToDb = require('./config/connectToDB') // importa lo que es la configuración de la base de datos
const Note = require('./models/note')
// crear una instancia express app para poder manejar 
const app = express()

// configurar las apps de la instancia express 
app.use(express.json())//Parsear (convertir) el cuerpo (body) de las solicitudes HTTP que vienen en formato JSON a un objeto JavaScript.

// conectar a la base de datos, primero probar con un console.log("hola")
connectToDb()

// crear las rutas (post, get, etc) ----------- de ruta ----------
app.get('/', (req, res) => {
    res.json({ hello: 'alexis te cocho?'})
})

// Crear la ruta para obtener las notas de un usuario
app.get('/notes', async (req, res) =>{
    // encontrar las notas
    const notes = await Note.find();
    // responder la petición con ellas
    res.json({notes: notes})
})

// crearemos otra ruta para obtener las notas de un usuario, la de arriba obtiene todas
app.get('/notes/:id', async (req, res) => {
    // obtener primeramente el id del usuario
    const noteId = req.params.id;
    
    // obtener las notas del id
    const note = await Note.findById(noteId);

    // responderlo con un json
    res.json({note: note});
})

//crear un enrutamiento para crear una nueva nota, tiene que ser una asincrona, ya que esperaremos una respuesta
app.post('/notes', async (req, res) =>{
    // obtener los datos enviados de la solicitud
    const title = req.body.title;
    const body = req.body.body;
    // crear una nota con ellos
    const note = await Note.create({ 
        title: title, // se ponen los nombres de los parametros, para después mandarlos a la base de datos
        body: body ,
    });
    // responder con la nueva nota ya puesta    
    res.json({note: note})
})

// crear un enrutamiento para modificar una nota
app.put('/notes/:id',async (req, res) => {
    // obtener el id de la url
    const noteId = req.params.id;

    // obtener los datos de la respuesta para moficarlo
    const title = req.body.title;
    const body = req.body.body;
    
    // modificar la nota
    await Note.findByIdAndUpdate(noteId ,{
        title: title,
        body: body
    });

    // encontrar la nota actualizada
    const note = await Note.findById(noteId);

    // responder con el archivo json 
    res.json({note: note});
})


// para eliminar una nota 
app.delete('/notes/:id', async (req, res) =>{
    // obtener el id de la url de la nota
    const notaId = req.params.id;

    // eliminar la nota
    //    const note = await Note.findByIdAndDelete(noteId);
    const note = await Note.findByIdAndDelete(notaId)
    if(note)
    {
        res.json({success: "Nota eliminada"})
    }
    else{
        res.json({error: "Intentelo de nuevo"})
    }

    
})

// iniciar el servidor
app.listen(process.env.PORT);