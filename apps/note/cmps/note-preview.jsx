import { noteService } from "../services/note.service.js";


export function NotePreview({ note }) {

    // const imgName = book.name ? book.name : 'default'
    // <img src={`assets/img/${imgName}.png`} />

    function noteType() {
        if (note.type === 'note-txt') {
            return <div>
                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
            </div>
        } else if (note.type === 'note-img') {
            return <div>
                <h3>{note.info.title}</h3>
                <img src={note.info.url} alt={note.info.title} />
            </div>
        } else if (note.type === 'note-todos') {
            return <div>
                <h3>{note.info.label}</h3>
                <p>{note.info.todos[1].txt}</p>
                <p>added at: {note.info.todos[1].doneAt}</p>
            </div>
        }
    }



    return <article className="note-preview">
        {noteType()}
        
    </article>
}