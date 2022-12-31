export function MailFolderList({ setMainShown, criteria, setCriteria, unreadCount, toggleMailMenu }) {

    function onSetCriteria(newStatus) {
        if (newStatus === 'starred') {
            criteria.status = ''
            criteria.isStarred = true
        } else {
            criteria.status = newStatus
            criteria.isStarred = false
        }
        setCriteria({ ...criteria })
        setMainShown('mailList')
        toggleMailMenu()
    }

    return <section className="mail-folder-list">
        <button className={`inbox-btn ${criteria.status === 'inbox' ? 'active' : ''}`} onClick={() => onSetCriteria('inbox')}>
            <span className="icon-txt-inbox-container">
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/inbox-icon.png" />
                <span>Inbox</span>
            </span>
            <span className="unreadCount">{unreadCount.inbox ? unreadCount.inbox : ''}</span>
        </button>
        <button className={`starred-btn ${criteria.isStarred ? 'active' : ''}`} onClick={() => onSetCriteria('starred')}>
            <span className="icon-txt-inbox-container">
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/star-icon.png" />
                <span>Starred</span>
            </span>
            <span className="unreadCount">{unreadCount.starred ? unreadCount.starred : ''}</span>
        </button>
        <button className={`sent-btn ${criteria.status === 'sent' ? 'active' : ''}`} onClick={() => onSetCriteria('sent')}>
            <span className="icon-txt-inbox-container">
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/sent-icon.png" />
                <span>Sent</span>
            </span>
            <span className="unreadCount">{unreadCount.sent ? unreadCount.sent : ''}</span>
        </button>
        <button className={`draft-btn ${criteria.status === 'draft' ? 'active' : ''}`} onClick={() => onSetCriteria('draft')}>
            <span className="icon-txt-inbox-container">
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/draft-icon.png" />
                <span>Draft</span>
            </span>
            <span className="unreadCount">{unreadCount.draft ? unreadCount.draft : ''}</span>
        </button>
        <button className={`trash-btn ${criteria.status === 'trash' ? 'active' : ''}`} onClick={() => onSetCriteria('trash')}>
            <span className="icon-txt-inbox-container">
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/delete-icon.png" />
                Trash
            </span>
        </button>
    </section>
}