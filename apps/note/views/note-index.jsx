const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { NoteNav } from "../cmps/note-nav.jsx";
import { NotePreview } from "../cmps/note-preview.jsx";

import { noteService } from "../services/note.service.js";

export function NoteIndex() {

    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => {
            // console.log('notes', notes);
            setNotes(notes)
        })

    }



    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            
            // showSuccessMsg('Book removed')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                // showErrorMsg('Could not remove car, try again please!')
            })
    }



    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }


    function onSaveNote(ev, noteToAdd) {
        ev.preventDefault()
        noteService.save(noteToAdd).then((note) => {
            console.log('note saved', note);
            // onAddNotes(note)
            // showSuccessMsg('note saved!')
            notes.unshift(note)
            setNotes(notes.slice())
            navigate('/note')

        })
    }


    if (!notes) return <h1>Notes you add appear here</h1>
    return <section className="note-index">

        <NoteFilter onSetFilter={onSetFilter} />

        <div className="notes-container">
            <NoteNav />
            {/* <Link to="/book/edit" className="add-book">Add Book</Link> */}
            <div className="note-crudl-container">
            <NoteAdd onSaveNote={onSaveNote} />

            {/* {noteIsPinned()} */}
            {/* <h1>Pinned</h1> */}
            {<NoteList notes={notes} onRemoveNote={onRemoveNote} />}

            {/* {notes.map(note => {
            if (note.isPinned) {
               return <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            }
        }
        )} */}


            {/* <h1>Others</h1> */}


            {!notes.length && <div>Notes you add appear here</div>}
            </div>
        </div>
    </section>

}
