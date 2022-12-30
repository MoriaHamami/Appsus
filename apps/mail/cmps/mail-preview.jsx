import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function MailPreview({ mail, setMainShown, setSelectedMailId, criteria, onIsRead, onRemoveMail }) {

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

    return <section>

        <div className={`mail-preview ${mail.isRead ? 'isRead' : ''}`} onClick={() => setToExpand(isToExpand => !isToExpand)}
            onMouseEnter={e => {
                setHoverBtnsStyle({ display: 'block' })
            }}
            onMouseLeave={e => {
                setHoverBtnsStyle({ display: 'none' })
            }}>

            <img className={`icon star ${mail.isStarred ? 'starred' : ''}`} src={`./assets/img/icons/icons-mail/${mail.isStarred ? 'starred' : 'star'}-icon.png`} />
            {/* <div className="to"> */}
            {criteria.status !== 'sent' && <div className="preview from">{mail.from}</div>}
            {criteria.status === 'sent' && <div className="preview to">To: {mail.to}</div>}
            <div className="preview subject">{mail.subject}</div>
            {!(criteria.status === 'trash') && hoverBtnsStyle.display === 'none' && <div className="preview date">{utilService.getDate(mail.sentAt)}</div>}
            {criteria.status === 'trash' && hoverBtnsStyle.display === 'none' && <div className="preview date">{utilService.getDate(mail.removedAt)}</div>}
            {/* <hr /> */}

            <div className="icons" style={hoverBtnsStyle}>
                <img className="icon" src={`./assets/img/icons/icons-mail/${mail.isRead ? 'mark-as-read' : 'mark-as-unread'}.png`} onClick={(ev) => onIsRead(ev, mail)} />
                <img className="delete-icon icon" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} />
            </div>
        </div>

        {isToExpand && <article className="mail-expand">
            <hr />
            <div className="mail-expand-txt">

                <img className="expand-icon icon" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={onExpandMail} />
                <h3 className="subject">{mail.subject}</h3>
                <h3 className="from">{mail.from}</h3>
                <p className="body">{mail.body}</p>
            </div>
        </article>}

    </section>
}