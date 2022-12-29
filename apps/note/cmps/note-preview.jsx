
const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";
import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";


export function NotePreview({ note, isPinned }) {

    const [color, setColor] = useState(noteService.get(note.id))
    // console.log('color', color);
    // console.log('isPinned', isPinned);
    // const imgName = book.name ? book.name : 'default'
    // <img src={`assets/img/${imgName}.png`} />


    const colorRef = useRef(null);

    useEffect(() => {
        loadNotes()
    }, [color,colorRef])

    function loadNotes() {
        noteService.query().then(notes => {
            // console.log('notes', notes);
        })

    }


    function noteType() {
        if (note.type === 'note-txt') {
            return <NoteTxt note={note} />

        } else if (note.type === 'note-img') {
            // return <div contentEditable onBlur={onSaveChange(note)}>
            return <NoteImg note={note} />

        } else if (note.type === 'note-todos') {
            return <NoteTodos note={note} />
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
            // console.log('color saved', color);
            // navigate('/note')

        })

    }


    return <article ref={colorRef} className="note-preview">
        {noteType()}
        {/* <button onClick={onChangeColor}><img src="./assets/img/icons/icons-notes/asset 22.svg" alt="" /></button> */}

        <form onChange={changeColor}>
            <label htmlFor={`color-${note.id}`}><img src="./assets/img/icons/icons-notes/asset 22.svg" alt="" /></label>
            <input type="color"
                name="style"
                id={`color-${note.id}`}
                // placeholder="Take a note..."
                value={note.backgroundColor}
                onChange={handleChange}

            />
            {/* <button>submit</button> */}
        </form>

        {/* <button onClick={onSaveChange}>save</button> */}

    </article>
}