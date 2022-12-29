

export function NoteTodos({ note }) {

    return <section className="note-todos">
        <h3>{note.info.label}</h3>

        <ul>
            {note.info.todos.map(todo => {
                return <li key={todo.txt}>{todo.txt}</li>
            })}
        </ul>

    </section>
}



