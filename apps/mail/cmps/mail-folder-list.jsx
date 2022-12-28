export function MailFolderList({ onSetCriteria, onToCompose }) {


    return <section className="mail-folder-list">
        <button className="compose-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/compose-icon.png" />
            Compose
        </button>
        <hr className="under-compose-btn" />
        <button className="inbox-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/inbox-icon.png" />
            Inbox
        </button>
        <button className="starred-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/star-icon.png" />
            Starred
        </button>
        <button className="sent-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/sent-icon.png" />
            Sent
        </button>
        <button className="draft-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/draft-icon.png" />
            Draft
        </button>
        <button className="trash-btn">
            <img className="folder-list-icon" src="../../assets/img/icons/icons-mail/delete-icon.png" />
            Trash
        </button>
    </section>
}