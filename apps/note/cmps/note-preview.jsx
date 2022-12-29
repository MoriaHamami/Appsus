
const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js";
import { NoteDetails } from "./note-details.jsx";
import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";


export function NotePreview({ note, isPinned, onRemoveNote }) {

    const [isShown, setIsShown] = useState(false)
    const [color, setColor] = useState(noteService.get(note.id))
    const [content, setContent] = useState(noteService.get(note.id))
    // console.log('color', color);
    // console.log('isPinned', isPinned);
    // const imgName = book.name ? book.name : 'default'
    // <img src={`assets/img/${imgName}.png`} />


    const colorRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        loadNotes()
    }, [color, colorRef, content, contentRef])

    function loadNotes() {
        noteService.query().then(notes => {
            // console.log('notes', notes);
        })

    }


    function noteType() {
        if (note.type === 'note-txt') {
            return <NoteTxt note={note} />

        } else if (note.type === 'note-img') {
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

    function changeContent() {
        noteService.save(note).then((content) => {
            console.log('content saved', content);
            // navigate('/note')

        })
    }

 

    return <article onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} ref={colorRef} className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
        <div ref={contentRef} onChange={changeContent} contentEditable suppressContentEditableWarning={true} >
            {noteType()}
        </div>


        {/* <Link to={`/note/${note.id}`}>select</Link> */}

        
       
        {isShown && (
            <div className="hidden-buttons">
            <form onChange={changeColor}>
            <label htmlFor={`color-${note.id}`}><img src="./assets/img/icons/icons-notes/asset 22.svg" alt="" /></label>
            <input type="color"
                name="style"
                id={`color-${note.id}`}
                // placeholder="Take a note..."
                value={note.backgroundColor}
                onChange={handleChange}

            />

        </form>
           <button onClick={() => onRemoveNote(note.id)}>x</button>
       </div>)}

        {/* <NoteDetails note={note} /> */}

    </article>
}