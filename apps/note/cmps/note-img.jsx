
const { useState, useEffect, useRef } = React


export function NoteImg({ note, onSaveNote }) {


    // console.log('onSaveNote', onSaveNote);
    // var url = note.info.img
    // console.log('url', url);
    // var id = url.split('C:\\fakepath\\')[1]
    // console.log('id', id);
    // // var embedlink = "http://" + id
    // var embedlink =  id

    return <section className="note-img">

        <h3 >{note.info.title}</h3>
        {/* do a loader */}
        {/* {isLoading && <Loader />} */}
        <img src={note.info.img} alt={note.info.title} />

    </section>
}