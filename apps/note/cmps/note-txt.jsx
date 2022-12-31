import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteTxt({ note}) {


    const contentRef = useRef(null)
    const titleRef = useRef(null)

    function changeContent(ev) {
        note.info.txt = contentRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', contentRef.current.innerText);

    }
    function changeContentTitle(ev) {
        note.info.title = titleRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', titleRef.current.innerText);

    }



    return <section className="note-txt css-fix" >
        <h3 ref={titleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        <p ref={contentRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.txt}</p>

    </section>
}