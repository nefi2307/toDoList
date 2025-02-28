const Note = require('../models/note')

const fetchNotes = async (req, res) => {
    // encontrar las notas
    const notes = await Note.find();
    // responder la petición con ellas
    res.json({ notes })
}

const fetchNote = async (req, res) => {
    // obtener primeramente el id del usuario
    const noteId = req.params.id;

    // obtener las notas del id
    const note = await Note.findById(noteId);

    if (!note || !noteId)
        res.json({ error: 'No se ha encontrado la nota' })
    // responderlo con un json
    res.json({ note: note });
}

const createNote = async (req, res) => {
    // obtener los datos enviados de la solicitud
    const {title, body} = req.body;
    
    // crear una nota con ellos
    const note = await Note.create({
        title: title, // se ponen los nombres de los parametros, para después mandarlos a la base de datos
        body: body,
    });
    // responder con la nueva nota ya puesta    
    res.json({ note: note })
}

const updateNote = async (req, res) => {
    // obtener el id de la url
    const noteId = req.params.id;

    // obtener los datos de la respuesta para moficarlo
    const title = req.body.title;
    const body = req.body.body;

    // modificar la nota
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    });

    // encontrar la nota actualizada
    const note = await Note.findById(noteId);

    // responder con el archivo json 
    res.json({ note: note });
}

const deleteNote = async (req, res) => {
    // obtener el id de la url de la nota
    const notaId = req.params.id;

    // eliminar la nota
    //    const note = await Note.findByIdAndDelete(noteId);
    const note = await Note.findByIdAndDelete(notaId)
    if (note) {
        res.json({ success: "Nota eliminada" })
    }    
        res.json({ error: "Intentelo de nuevo" })
    
}

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}