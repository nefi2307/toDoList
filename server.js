if (process.env.NODE_ENV != "production") {
    // cargar el archivo .env para las variables
    require("dotenv").config()
}
// importar las dependencias
const express = require('express')
const connectToDb = require('./config/connectToDB') // importa lo que es la configuración de la base de datos
//const Note = require('./models/note')
// crear una instancia express app para poder manejar 
const app = express()

// importar los controladores de la nota
const noteController = require('./controllers/notesController')

// configurar las apps de la instancia express 
app.use(express.json())//Parsear (convertir) el cuerpo (body) de las solicitudes HTTP que vienen en formato JSON a un objeto JavaScript.

// conectar a la base de datos, primero probar con un console.log("hola")
connectToDb()

// crear las rutas (post, get, etc) ----------- de ruta ----------
//app.get('/', (req, res) => {
  //  res.json({ hello: 'alexis'})
//})

// --------------- RUTAS ------------------------------------ \\
// Crear la ruta para obtener las notas de un usuario
app.get('/notes', noteController.fetchNotes)

// crearemos otra ruta para obtener las notas de un usuario, la de arriba obtiene todas
app.get('/notes/:id', noteController.fetchNote)

//crear un enrutamiento para crear una nueva nota, tiene que ser una asincrona, ya que esperaremos una respuesta
app.post('/notes', noteController.createNote)

// crear un enrutamiento para modificar una nota
app.put('/notes/:id', noteController.updateNote)

// para eliminar una nota 
app.delete('/notes/:id', noteController.deleteNote)

// iniciar el servidor
app.listen(process.env.PORT);