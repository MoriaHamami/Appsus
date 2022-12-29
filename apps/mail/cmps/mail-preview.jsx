import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function MailPreview({ mail, setMainShown, setSelectedMailId, criteria }) {

    const [isToExpand, setToExpand] = useState(false)

    // function getStar(){
    //     if(mail.isStarred) return ''
    //     else return
    // }

    function onExpandMail() {
        mail.isRead = true
        setMainShown('mailDetails')
        setSelectedMailId(mail.id)
    }

    return <section>

        <article className={`mail-preview ${mail.isRead ? 'isRead' : ''}`} onClick={() => setToExpand(isToExpand => !isToExpand)}>
            <img className={`icon star ${mail.isStarred ? 'starred' : ''}`} src={`./assets/img/icons/icons-mail/${mail.isStarred ? 'starred' : 'star'}-icon.png`} />
            {criteria.status !== 'sent' && <span className="preview from">{mail.from}</span>}
            {criteria.status === 'sent' && <span className="preview to">To: {mail.to}</span>}
            <span className="preview subject">{mail.subject}</span>
            {!(criteria.status === 'trash') && <span className="preview subject">{utilService.getDate(mail.sentAt)}</span>}
            {criteria.status === 'trash' && <span className="preview subject">{utilService.getDate(mail.removedAt)}</span>}
            {/* <hr /> */}
        </article>

        {isToExpand && <article className="mail-expand">
            <hr />
            <img className="expand-icon icon" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={onExpandMail} />
            <h3 className="subject">{mail.subject}</h3>
            <h3 className="from">{mail.from}</h3>
            <p className="body">{mail.body}</p>
        </article>}
        
    </section>
}