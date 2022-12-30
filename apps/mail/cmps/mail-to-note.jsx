
export function MailToNote({ mail }) {

    function sendToNote(ev) {
        ev.stopPropagation()
        // Define new path
        const queryStringParams = `#/note?subject=${mail.subject}&body=${mail.body}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }

    return <section className="mailToNote" onClick={(ev) => sendToNote(ev)}>
        <img className="export-icon icon" src="./assets/img/icons/icons-mail/export-icon.png" />
    </section>
}
