import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteVideo({note}) {

    const titleRef = useRef(null)

    function changeContentTitle(ev) {
        note.info.title = titleRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', titleRef.current.innerText);

    }

    var url = note.info.url
    var id = url.split("?v=")[1]

    var embedlink = "http://www.youtube.com/embed/" + id

    return <section className="note-video css-fix">

        <h3 ref={titleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>

        <iframe width="210" height="157.5"
            src={embedlink}>
        </iframe>
    </section>
}