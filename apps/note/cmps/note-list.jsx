import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function NoteList({ notes, onRemoveNote , onSaveNote}) {

    const [isPinned, setIsPinned] = useState(false)


    return <ul className="note-list">
        {
            notes.map(note => <li key={note.id} >

                <NotePreview note={note} isPinned={note.isPinned} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote}/>
                
                
            </li>)
        }
    </ul>

}
