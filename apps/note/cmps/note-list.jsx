import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM



export function NoteList({ notes, onRemoveNote }) {



    function noteIsPinned() {
        let notePinned = notes.map(note => {
            console.log('note', note);
            if (note.isPinned) {
                return <div>
                    <h1>Pinned</h1>
                    <NotePreview />

                </div>
            } else {
                return <div>
                    <h1></h1>
                    <NotePreview />
                </div>
            }
        })
    }

    return <ul className="note-list">
        {
            notes.map(note => <li key={note.id}>

                <NotePreview note={note} isPinned={note.isPinned}/>
                
                {/* {note.isPinned && <NotePreview note={note} isPinned={note.isPinned}/>} */}

                {/* <h1>Rest</h1>
                {!note.isPinned && <NotePreview note={note} />} */}

                {/* <Link to={`/note/${note.id}`}><NotePreview note={note} /></Link> */}
                {/* <button onClick={() => onRemoveNote(note.id)}>x</button> */}

                <div>
                    <button onClick={() => onRemoveNote(note.id)}>x</button>
                </div>
            </li>)
        }
    </ul>

}
