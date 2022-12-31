
const { useState, useEffect, useRef } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js";
import { NoteImg } from "./note-img.jsx";
import { NoteToMail } from "./note-to-mail.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteVideo } from "./note-video.jsx";


export function NotePreview({ note, onRemoveNote, onSaveNote, onEditNote }) {

    const [isShown, setIsShown] = useState(false)
    const [color, setColor] = useState(noteService.get(note.id))
    const [content, setContent] = useState(null)

    const colorRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        loadNotes()
    }, [color, colorRef, content, contentRef])

    function loadNotes() {
        noteService.query().then(notes => {
        })

    }

    function noteType() {
        if (note.type === 'text') {
            return <NoteTxt note={note} onEditNote={onEditNote} />

        } else if (note.type === 'file') {
            return <NoteImg note={note} onSaveNote={onSaveNote} />

        } else if (note.type === 'note-todos') {
            return <NoteTodos note={note} />

        } else if (note.type === 'url') {
            return <NoteVideo note={note} />
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'color') value = { ...note.style, backgroundColor: value }
        setColor((prevColor) => ({ ...prevColor, [field]: value }))
        colorRef.current.style.backgroundColor = value
    }

    function changeColor(ev) {
        ev.preventDefault()
        colorRef.current.style.backgroundColor = color.style.backgroundColor
        note.style.backgroundColor = color.style.backgroundColor

        noteService.save(note).then((color) => {
        })

    }

    return <article ref={colorRef} className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>

        {<div>
            {noteType()}

        </div>}
        <div className="hidden-buttons">
            <form className="tooltip" onChange={changeColor}>
                <label htmlFor={`color-${note.id}`}><img src="./assets/img/icons/icons-notes/asset 22.svg" alt="" /><span className="tooltiptext">Color</span></label>
                <input type="color"
                    name="style"
                    id={`color-${note.id}`}
                    value={note.backgroundColor}
                    onChange={handleChange}

                />
            </form>
            {<NoteToMail note={note} />}
            <button className="tooltip" onClick={() => onRemoveNote(note.id)}><img src="./assets/img/icons/icons-notes/delete_FILL0_wght400_GRAD0_opsz48.svg" alt="" /><span className="tooltiptext">Delete</span></button>
        </div>

    </article>
}
