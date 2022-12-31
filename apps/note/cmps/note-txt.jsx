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


    // function onEditNote(ev) {
    //     if (contentRef.current.contentEditable) {
    //         console.log('true')
    //         contentRef.current.contentEditable = true
    //         contentRef.current.focus()
    //         contentRef.current = innerText
    //         changeContent(ev)
    //     } else {
    //         console.log('false')
    //         contentRef.current.contentEditable = false
    //         // contentRef.current.blur()
    //         noteService.save(note).then((content) => {
    //             console.log('content saved', content);


    //         })
    //     }
    // }


    return <section className="note-txt css-fix" >
        <h3 ref={titleRef} onKeyDown={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        <p ref={contentRef} onKeyDown={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.txt}</p>
      
        {/* { <button className="edit_content tooltip" onClick={onEditNote(note.id)}>edit<span className="tooltiptext">Edit</span></button>} */}
        {/* return <div contentEditable onBlur={onSaveChange(note)}></div> */}
    </section>
}