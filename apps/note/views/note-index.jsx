const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { NoteNav } from "../cmps/note-nav.jsx";
import { NotePreview } from "../cmps/note-preview.jsx";

import { noteService } from "../services/note.service.js";

export function NoteIndex() {

    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    // const [previewBy, setPreviewBy] = useState(noteService.get())
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

    function onAddNotes(note) {
        console.log(note);
        const addNote = noteService.addNotes(note)


        // console.log('note after', addNote)


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

    // function onSaveNote(noteToAdd, noteId) {
    //     const note = notes.find(note => note.is === noteId)
    //     bookService.saveReview(note, noteToAdd)
    //         .then((note) => {
    //             const reviews = [note, ...book.reviews]
    //             setBook({ ...book, reviews })
    //         })
    //         .catch((err) => {
    //             console.log('err:', err);

    //         })
    // }

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
    // function onSetPreview(notesFromPreview) {
    //     setFilterBy(notesFromPreview)
    // }

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
            <NoteAdd onAddNotes={onAddNotes} onSaveNote={onSaveNote} />

            {/* <BookAdd onAddGoogleBook={onAddGoogleBook} /> */}
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
