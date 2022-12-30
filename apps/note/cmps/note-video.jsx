


export function NoteVideo({note}) {

    var url = note.info.url
    var id = url.split("?v=")[1]; //sGbxmsDFVnE

    var embedlink = "http://www.youtube.com/embed/" + id; //www.youtube.com/embed/sGbxmsDFVnE

    return <section className="note-video">

        <h3 >{note.info.title}</h3>
        {/* do a loader */}
        {/* {isLoading && <Loader />} */}
        {/* <img src={note.info.url} alt={note.info.title} /> */}
        {/* <img src={note.info.url} alt={note.info.title} /> */}
        <iframe width="210" height="157.5"
            src={embedlink}>
        </iframe>
    </section>
}