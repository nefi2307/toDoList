// vamos a crear el esquema de la nota
// usando como referencia el de la documentación
/*
const kittySchema = new mongoose.Schema({
    name: String
  });
const Kitten = mongoose.model('Kitten', kittySchema);

  */
const mongoose = require('mongoose') // importar la dependencia de mongoose 
// definir el esquema de la nota
const noteSchema = new mongoose.Schema({
    title: String, // Se ponen los campos que corresponden
    body: String   // 
  });
// esto crea un modelo a partir del esquema
const Note = mongoose.model('Note', noteSchema);
// exportar el modelo 
module.exports = Note;