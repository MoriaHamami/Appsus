const { useNavigate } = ReactRouterDOM

export function MailToNote({ mail }) {

    const navigate = useNavigate()

    function sendToNote(ev) {
        ev.stopPropagation()
        navigate('/note')
        // Define new path
        const queryStringParams = `?subject=${mail.subject}&body=${mail.body}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }

    return <img title="Save as note" className="mailToNote export-icon icon" src="./assets/img/icons/icons-mail/export-icon.png" onClick={(ev) => sendToNote(ev)} />

}
