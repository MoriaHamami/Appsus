import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteTodos({ note }) {

    const contentRef = useRef(null)
    const titleRef = useRef(null)

    function changeContent(ev) {
        note.info.label = contentRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', contentRef.current.innerText);

    }
    function changeContentTitle(ev) {
        note.info.title = titleRef.current.innerText
        noteService.save(note)
        console.log('contentRef.current.innerText', titleRef.current.innerText);

    }

    return <section className="note-todos">
        <h3 ref={titleRef} onKeyDown={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.label}</h3>

        <ul ref={contentRef} onKeyDown={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>
            {note.info.todos.map(todo => {
                return <li key={todo.txt}>{todo.txt}</li>
            })}
        </ul>

    </section>
}



