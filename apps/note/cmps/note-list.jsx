import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function NoteList({ notes, onRemoveNote , onSaveNote}) {

    const [isPinned, setIsPinned] = useState(false)

    function noteIsPinned() {
        if (isPinned) {
            return <div>
                {/* <h1>Pinned</h1> */}
                {notes.map(note => {
                    console.log('pinned', note);
                    {
                        if (note.isPinned) {
                           return <NotePreview note={note} isPinned={note.isPinned} onRemoveNote={onRemoveNote}/>
                        }
                    }
                })}

                <h1>Others</h1>
                {notes.map(note => {
                   {return !note.isPinned && <NotePreview note={note} isPinned={note.isPinned} onRemoveNote={onRemoveNote}/>}
                })}

            </div>
        } else {
            return <div>
                <h1></h1>
                <NotePreview />
            </div>
        }
    }

    return <ul className="note-list">
        {
            notes.map(note => <li key={note.id} >

                <NotePreview note={note} isPinned={note.isPinned} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote}/>
                
                {/* {noteIsPinned()} */}
                {/* {note.isPinned && <NotePreview note={note} isPinned={note.isPinned}/>} */}

                {/* <h1>Pinned</h1>
                {isPinned && <NotePreview note={note} />}
                <h1>Rest</h1>
                {!isPinned && <NotePreview note={note} />} */}

                {/* <Link to={`/note/${note.id}`}><NotePreview note={note} /></Link> */}
                {/* <button onClick={() => onRemoveNote(note.id)}>x</button> */}

                
            </li>)
        }
    </ul>

}
