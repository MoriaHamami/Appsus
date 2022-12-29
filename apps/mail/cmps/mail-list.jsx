import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, isLoading, setMainShown, setSelectedMailId, criteria, onRemoveMail, onIsRead }) {

    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id} className={`mail-whole-preview ${mail.isRead ? 'mark-as-read' : 'mark-as-unread'}`}>
                <div className="mail-semi-whole-preview">
                    <div className="icons">
                        <img className="icon" src={`./assets/img/icons/icons-mail/${mail.isRead ? 'mark-as-read' : 'mark-as-unread'}.png`} onClick={(ev) => onIsRead(ev, mail)} />
                        <img className="delete-icon icon" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} />
                        {/* <Link to={`/mail/${mail.id}`}>Details</Link> | */}
                        {/* <Link to={`/mail/edit/${mail.id}`}> Edit</Link> */}
                    </div>
                    <MailPreview mail={mail} setMainShown={setMainShown} setSelectedMailId={setSelectedMailId} criteria={criteria} />
                </div>
                <hr />
            </li>)
        }
        {!mails.length && !isLoading && <h3 className="no-items">No items to show..</h3>}
    </ul>

}

