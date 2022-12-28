export function MailNav({ onSetCriteria, onToCompose }) {


    return <section className="mail-nav">
        <button className="compose-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/compose-icon.png" />
            Compose
        </button>
        <button className="inbox-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/inbox-icon.png" />
            Inbox
        </button>
        <button className="starred-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/star-icon.png" />
            Starred
        </button>
        <button className="sent-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/sent-icon.png" />
            Sent
        </button>
        <button className="draft-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/draft-icon.png" />
            Draft
        </button>
        <button className="trash-btn">
            <img className="nav-icon" src="../../assets/img/icons/icons-mail/delete-icon.png" />
            Trash
        </button>
    </section>
}