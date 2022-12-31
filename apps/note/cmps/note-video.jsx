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
    var id = url.split("?v=")[1]; //sGbxmsDFVnE

    var embedlink = "http://www.youtube.com/embed/" + id; //www.youtube.com/embed/sGbxmsDFVnE

    return <section className="note-video css-fix">

        <h3 ref={titleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        {/* do a loader */}
        {/* {isLoading && <Loader />} */}
        {/* <img src={note.info.url} alt={note.info.title} /> */}
        {/* <img src={note.info.url} alt={note.info.title} /> */}
        <iframe width="210" height="157.5"
            src={id}>
        </iframe>
    </section>
}