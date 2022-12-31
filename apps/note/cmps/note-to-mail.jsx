const { useNavigate, useParams, Link } = ReactRouterDOM

export function NoteToMail({ note }) {

    const navigate = useNavigate()
    
    function sendToMail(ev) {
        ev.stopPropagation()
        navigate('/mail')
        // Define new path
        const queryStringParams = `?subject=${note.info.title}&body=${note.info.txt}`
        // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)

    }

    return <section className="note-to-mail" >

       <button onClick={(ev) => sendToMail(ev)}>send</button>

    </section>

}