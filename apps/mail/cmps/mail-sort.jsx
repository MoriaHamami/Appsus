const { useState } = React

export function MailSort({ dateIcon, subjectIcon, onSubjectSort, onDateSort, onSetCriteria }) {

    const [selectedOpt, setSelectedOpt] = useState('all')

    function onOptSelected(currSelectedOpt) {
        setSelectedOpt(currSelectedOpt)
        if (currSelectedOpt === 'all') onSetCriteria('isRead', '')
        else if (currSelectedOpt === 'read') onSetCriteria('isRead', true)
        else if (currSelectedOpt === 'unread') onSetCriteria('isRead', false)
    }

    return <section className="mail-sort">
        <button onClick={onDateSort}>
            <img className="sort-icon icon" src={`./assets/img/icons/icons-mail/${dateIcon}-icon.png`} />
            Date
        </button>
        <button onClick={onSubjectSort}>
            <img className="sort-icon icon" src={`./assets/img/icons/icons-mail/${subjectIcon}-icon.png`} />
            Subject
        </button>

        <div className="dropdown">
            <button className="dropbtn" style={{ textTransform: 'capitalize' }}>
                <img className="sort-icon icon" src="./assets/img/icons/icons-mail/down-icon.png" />
                {selectedOpt}
            </button>
            <div className="dropdown-content">
                {selectedOpt !== 'all' && <a className="all-btn" onClick={() => onOptSelected('all')} style={{ textTransform: 'capitalize' }}>All</a>}
                {selectedOpt !== 'read' && <a className="read-btn" onClick={() => onOptSelected('read')} style={{ textTransform: 'capitalize' }}>Read</a>}
                {selectedOpt !== 'unread' && <a className="unread-btn" onClick={() => onOptSelected('unread')} style={{ textTransform: 'capitalize' }}>Unread</a>}
            </div>
        </div>

    </section >

}
