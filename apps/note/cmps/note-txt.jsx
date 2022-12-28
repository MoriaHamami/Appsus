

export function NoteTxt({ note }) {


    return <section className="note-txt">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
    </section>
}