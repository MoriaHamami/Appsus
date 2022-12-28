const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({onAddNotes}) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    // const { noteId } = useParams()
    // const { noteId } = useParams()


    // useEffect(() => {
    //     // if (!noteId) return
    //     // loadNote()
        
    // }, [noteToAdd])

    // function loadNote() {
    //     noteService.get(noteId)
    //         .then((note) => setNoteToAdd(note))
    //         .catch((err) => {
    //             console.log('Had issues in note details', err)

    //         })
    // }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        // value = type === 'number' ? +value : value
        // if (type === 'number')  value = {...noteToEdit.listPrice, amount: +value}
        if (type === 'text') value = { ...noteToAdd.info, txt: value }
        setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd).then((note) => {
            console.log('note saved', note);
            // onAddNotes(note)
            // showSuccessMsg('note saved!')
            navigate('/note')

        })
    }

    return <section className="note-add">

        <form onSubmit={onSaveNote}>
            <label htmlFor="title"></label>
            <input type="text"
                name="info"
                id="title"
                placeholder="Take a note..."
                value={noteToAdd.txt}
                onChange={handleChange}
                required
            />


            <button>Add</button>

        </form>

    </section>
}