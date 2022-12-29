

export function NoteTodos({ note }) {

    return <section className="note-todos">
        <h3>{note.info.label}</h3>
        <p>{note.info.todos[1].txt}</p>
        <p>added at: {note.info.todos[1].doneAt}</p>
    </section>
}