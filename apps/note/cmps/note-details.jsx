
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteDetails() {

    const [note, setNote] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote()
    }, [noteId])

    function loadNote() {
        noteService.get(noteId)
            .then((note) => setNote(note))
            .catch((err) => {
                console.log('Had issues in note details', err)
                navigate('/note')
            })
    }

    function onGoBack() {
        navigate('/note')
    }


    return <section className="note-details">
        <h1>hello from note details</h1>
        
    </section>
}