
export function NoteImg({ note }) {

    return <section className="note-img">
        <h3>{note.info.title}</h3>
        {/* do a loading */}
        {/* {isLoading && <Loader />} */}
        <img src={note.info.url} alt={note.info.title} />
    </section>
}