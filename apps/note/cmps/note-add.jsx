const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNotes, onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()


    function handleChange({ target }) {
        let { value, type, name: field } = target
        // value = type === 'number' ? +value : value
        // if (type === 'number')  value = {...noteToEdit.listPrice, amount: +value}
        if (type === 'text') value = { ...noteToAdd.info, txt: value }
        else if (type === 'file') value = { ...noteToAdd.info, url: value }
        setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    }



    return <section className="note-add">

        <form method="post" encType="multipart/form-data" onSubmit={(ev) => onSaveNote(ev, noteToAdd)}>
            <label htmlFor="title"></label>
            <input type="text"
                name="info"
                id="title"
                placeholder="Take a note..."
                value={noteToAdd.txt}
                onChange={handleChange}
                required
            />
            <label htmlFor="url">choose image</label>
            <input type="file"
                name="info"
                id="url"
                placeholder="Take a note..."
                value={noteToAdd.url}
                onChange={handleChange}
                accept="image/png, image/jpeg"
                // required
            />


                <button title="Add">Add</button>

        </form>

    </section>
}