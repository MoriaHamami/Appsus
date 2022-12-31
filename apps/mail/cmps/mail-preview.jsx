import { utilService } from "../../../services/util.service.js"
import {MailToNote} from "./mail-to-note.jsx"

const { useState } = React

export function MailPreview({ mail, setMainShown, setSelectedMailId, criteria, onIsRead, onRemoveMail, onIsStarred, setShowEdit }) {

    const [isToExpand, setToExpand] = useState(false)
    const [hoverBtnsStyle, setHoverBtnsStyle] = useState({ display: 'none' })

    // function getStar(){
    //     if(mail.isStarred) return ''
    //     else return
    // }

    function onExpandMail() {
        mail.isRead = true
        setMainShown('mailDetails')
        setSelectedMailId(mail.id)
    }

    function onSetEdit(ev, mailId) {
        ev.stopPropagation()
        setSelectedMailId(mailId)
        setShowEdit(true)
    }

    return <section>

        <div className={`mail-preview ${mail.isRead ? 'isRead' : ''}`} onClick={() => setToExpand(isToExpand => !isToExpand)}
            onMouseEnter={e => {
                setHoverBtnsStyle({ display: 'block' })
            }}
            onMouseLeave={e => {
                setHoverBtnsStyle({ display: 'none' })
            }}>

            {mail.isStarred && <img className="icon star starred" title="Starred" src="./assets/img/icons/icons-mail/starred-icon.png" onClick={(ev)=>{onIsStarred(ev, mail)}} />}
            {!mail.isStarred &&  <img className="icon star" title="Not starred" src="./assets/img/icons/icons-mail/star-icon.png" onClick={(ev)=>{onIsStarred(ev, mail)}} />}
            {/* <div className="to"> */}
            {criteria.status !== 'sent' && criteria.status !== 'draft' && <div className="preview from">{mail.from}</div>}
            {criteria.status === 'sent' || criteria.status === 'draft' && <div className="preview to">To: {mail.to}</div>}
            <div className="preview subject">{mail.subject}</div>
            {!(criteria.status === 'trash') && hoverBtnsStyle.display === 'none' && <div className="preview date">{utilService.getDate(mail.sentAt) || ''}</div>}
            {criteria.status === 'trash' && hoverBtnsStyle.display === 'none' && <div className="preview date">{utilService.getDate(mail.removedAt) || ''}</div>}
            {/* <hr /> */}

            <div className="icons" style={hoverBtnsStyle}>
                <MailToNote mail={mail} />
                {criteria.status === 'draft' && <img className="edit-icon icon" title="Edit" src="./assets/img/icons/icons-mail/edit-icon.png" onClick={(ev) => onSetEdit(ev, mail.id)} />}
                {!mail.isRead && <img className="icon" title="Mark as read" src="./assets/img/icons/icons-mail/mark-as-read.png" onClick={(ev) => onIsRead(ev, mail)} />}
                {mail.isRead && <img className="icon" title="Mark as unread" src="./assets/img/icons/icons-mail/mark-as-unread.png" onClick={(ev) => onIsRead(ev, mail)} />}
                <img className="delete-icon icon" title="Delete" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} />
            </div>
        </div>

        {isToExpand && <article className="mail-expand">
            <hr />
            <div className="mail-expand-txt">

                <img className="expand-icon icon" title="Expand" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={onExpandMail} />
                <h3 className="subject">{mail.subject}</h3>
                <h4 className="from">{mail.from}</h4>
                <p className="body">{mail.body}</p>
            </div>
        </article>}

    </section>
}