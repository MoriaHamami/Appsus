import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, isLoading, setIsShown }) {

    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id}>
                <MailPreview mail={mail} setIsShown={setIsShown}/>
                <div>
                <img className={`icon ${mail.isRead ? 'mark-as-unread' : 'mark-as-read'}`} src={`../../assets/img/icons/icons-mail/${mail.isRead ? 'mark-as-unread' : 'mark-as-read'}.png`} />
                <img className="delete-icon icon" src="../../assets/img/icons/icons-mail/delete-icon.png" />
                    {/* <Link to={`/mail/${mail.id}`}>Details</Link> | */}
                    {/* <Link to={`/mail/edit/${mail.id}`}> Edit</Link> */}
                </div>
            </li>)
        }
        {!mails.length && !isLoading && <h3 className="no-items">No items to show..</h3>}

    </ul>

}

