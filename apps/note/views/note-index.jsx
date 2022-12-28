const { useState, useEffect } = React

import { NoteList } from "../cmps/note-list.jsx";
import { NotePreview } from "../cmps/note-preview.jsx";

import { noteService } from "../services/note.service.js";

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(notes => {
           console.log('notes', notes);
            setNotes(notes)
        })

    }

    function onAddNotes(note) {
        console.log(note);
        const addNote = noteService.addNotes(note)
        
        
        console.log('note after', addNote)


        noteService.save(addNote).then((note) => {
            console.log('note saved', note)

            notes.push(note)
            setNotes(notes.slice())
            // showSuccessMsg('Book saved!')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            // showErrorMsg('Could not add book, try again please!')
        })

    }

    if (!notes) return <h1>Notes you add appear here</h1>
    return <section className="note-index">
        <h1>hello from note index</h1>

        {/* <Link to="/book/edit" className="add-book">Add Book</Link> */}

        {/* <BookAdd onAddGoogleBook={onAddGoogleBook} /> */}

        {<NoteList notes={notes} />}

        {!notes.length && <div>Notes you add appear here</div>}

    </section>

}
