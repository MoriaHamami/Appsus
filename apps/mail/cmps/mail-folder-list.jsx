export function MailFolderList({ criteria, setCriteria }) {

    function onSetCriteria(newStatus) {
        criteria.status = newStatus
        setCriteria({ ...criteria })
    }

    return <section className="mail-folder-list">
        <button className={`inbox-btn ${criteria.status === 'inbox' ? 'active' : ''}`} onClick={() => onSetCriteria('inbox')}>
            <img className="list-icon icon" src="./../../assets/img/icons/icons-mail/inbox-icon.png" />
            Inbox
        </button>
        <button className={`starred-btn ${criteria.status === 'starred' ? 'active' : ''}`} onClick={() => onSetCriteria('starred')}>
            <img className="list-icon icon" src="../../assets/img/icons/icons-mail/star-icon.png" />
            Starred
        </button>
        <button className={`sent-btn ${criteria.status === 'sent' ? 'active' : ''}`} onClick={() => onSetCriteria('sent')}>
            <img className="list-icon icon" src="../../assets/img/icons/icons-mail/sent-icon.png" />
            Sent
        </button>
        <button className={`draft-btn ${criteria.status === 'draft' ? 'active' : ''}`} onClick={() => onSetCriteria('draft')}>
            <img className="list-icon icon" src="../../assets/img/icons/icons-mail/draft-icon.png" />
            Draft
        </button>
        <button className={`trash-btn ${criteria.status === 'trash' ? 'active' : ''}`} onClick={() => onSetCriteria('trash')}>
            <img className="list-icon icon" src="../../assets/img/icons/icons-mail/delete-icon.png" />
            Trash
        </button>
    </section>
}