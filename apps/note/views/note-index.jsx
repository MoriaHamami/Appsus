const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";



import { noteService } from "../services/note.service.js";

export function NoteIndex() {

    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    const [isPinned, setIsPinned] = useState(true)

    useEffect(() => {
        // if (!info) return
        getMailParams()
    }, [])


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => {
            // console.log('notes', notes);
            setNotes(notes)
        })

    }


    function getMailParams() {
        // Get current params and set them in our variables
        let queryStringParams = new URLSearchParams(window.location.search)
        if (queryStringParams === '#/note') return

        const subject = queryStringParams.get('subject')
        const body = queryStringParams.get('body')

        // console.log('body:', body)
        if (!subject || !body) return

        // A note was sent to mail, add note to inbox
        const newNote = noteService.getEmptyNote()
        newNote.info.title = subject
        newNote.info.txt = body
        newNote.type = 'text'

        onSaveNote('', newNote)

        // Reset params
        queryStringParams = '#/note'
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)

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


    function onSaveNote(ev, noteToAdd, file,video, txtRef, videoRef, imgRef) {
    

        var url = noteToAdd.info.url
        var id = url.split("?v=")[1]

        var embedlink = "http://www.youtube.com/embed/" + id

        // noteToAdd.info.url = embedlink
        noteToAdd.info.img = file

        if (ev) ev.preventDefault()
        noteService.save(noteToAdd).then((note) => {
            console.log('note saved', note);
            // onAddNotes(note)
            // showSuccessMsg('note saved!')
            notes.unshift(note)
            setNotes(notes.slice())
            // navigate('/note')
            txtRef.current.value = ''
            videoRef.current.value = ''
            imgRef.current.value = ''
        })
    }




    if (!notes) return <h1>Notes you add appear here</h1>
    return <section className="note-index">

        <NoteFilter onSetFilter={onSetFilter} />

        <div className="notes-container">

            <div className="note-crudl-container">
                <NoteAdd notes={notes} onSaveNote={onSaveNote} />

                {<NoteList notes={notes} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} />}


                {!notes.length && <div>Notes you add appear here</div>}
            </div>
        </div>
    </section>

}
