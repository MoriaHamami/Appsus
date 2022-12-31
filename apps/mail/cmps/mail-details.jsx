const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails({ setIsLoading, setMainShown, selectedMailId, setSelectedMailId, onRemoveMail, criteria, onIsRead, onIsStarred }) {

    const [mail, setMail] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    useEffect(() => {
        loadMail()
    }, [selectedMailId])

    function loadMail() {
        mailService.get(selectedMailId)
            .then((mail) => {
                setMail(mail)
                setIsLoading(false)
                return mail
            })
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })
    }

    function onSetTimeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000)

        var interval = seconds / 31536000

        if (interval > 1) {
            return Math.floor(interval) + " years ago"
        }
        interval = seconds / 2592000
        if (interval > 1) {
            return Math.floor(interval) + " months ago"
        }
        interval = seconds / 86400
        if (interval > 1) {
            return Math.floor(interval) + " days ago"
        }
        interval = seconds / 3600
        if (interval > 1) {
            return Math.floor(interval) + " hours ago"
        }
        interval = seconds / 60
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago"
        }
        return Math.floor(seconds) + " seconds ago"
    }

    if (!mail) return <div>Loading...</div>

    return <section className="mail-details">

        <img className="back-icon icon" src="./assets/img/icons/icons-mail/back-icon.png" onClick={() => setMainShown('mailList')} />

        {!mail.isRead && <img className="icon" title="Mark as read" src="./assets/img/icons/icons-mail/mark-as-read.png" onClick={(ev) => onIsRead(ev, mail)} />}
        {mail.isRead && <img className="icon" title="Mark as unread" src="./assets/img/icons/icons-mail/mark-as-unread.png" onClick={(ev) => onIsRead(ev, mail)} />}
        <img className="delete-icon icon" title="Delete" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} />
        {mail.isStarred && <img className="icon star starred" title="Starred" src="./assets/img/icons/icons-mail/starred-icon.png" onClick={(ev) => { onIsStarred(ev, mail) }} />}
        {!mail.isStarred && <img className="icon star" title="Not starred" src="./assets/img/icons/icons-mail/star-icon.png" onClick={(ev) => { onIsStarred(ev, mail) }} />}
        {!(criteria.status === 'trash') && <span className="date">{mail.sentAt ? onSetTimeSince(mail.sentAt) : ''}</span>}
        {criteria.status === 'trash' && <span className="date">{mail.sentAt ? onSetTimeSince(mail.removedAt) : ''}</span>}

        <h2 className="subject">{mail.subject}</h2>
        <h3 className="from">{mail.from}</h3>
        <h4 className="to">{mail.to}</h4>
        <p className="body">{mail.body}</p>

    </section>

}