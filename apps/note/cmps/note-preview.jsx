import { noteService } from "../services/note.service.js";
import { NoteImg } from "./note-img.jsx";
import { NoteTxt } from "./note-txt.jsx";


export function NotePreview({ note, isPinned }) {

    // console.log('isPinned', isPinned);
    // const imgName = book.name ? book.name : 'default'
    // <img src={`assets/img/${imgName}.png`} />

    function onSaveChange() {
        noteService.save(note)
        console.log('note', note);
    }

    function noteType() {
        if (note.type === 'note-txt') {
            return <NoteTxt note={note} />

        } else if (note.type === 'note-img') {
            // return <div contentEditable onBlur={onSaveChange(note)}>
            return <NoteImg note={note} />

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