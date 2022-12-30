

export function NoteToMail({ note }) {

    function sendToMail() {

        // Define new path
        const queryStringParams = `?subject=${note.info.title}&body=${note.info.txt}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)

    }

    return <section className="note-to-mail" >

       <button onClick={sendToMail}>QueryParam</button>

    </section>

}