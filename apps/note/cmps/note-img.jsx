import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteImg({ note, onSaveNote }) {

    const [file, setFile] = useState();

    const titleRef = useRef(null)

    function changeContentTitle(ev) {
        note.info.title = titleRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', titleRef.current.innerText);

    }

    return <section className="note-img css-fix">

        <h3 ref={titleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        {/* do a loader */}
        {/* {isLoading && <Loader />} */}
        <img src={note.info.img} alt={note.info.title} />

    </section>
}