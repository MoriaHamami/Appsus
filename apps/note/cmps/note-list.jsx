import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM



export function NoteList({notes}) {

    return <ul className="note-list">
        {
            notes.map(note => <li key={note.id}>
                <NotePreview note={note} />
                <div>
                    {/* <button onClick={() => onRemoveBook(book.id)}>Remove</button> */}
                    <Link to={`/note/${note.id}`}>Select</Link>
                </div>
            </li>)
        }
    </ul>

}
