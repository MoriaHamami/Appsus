import { MailPreview } from "./mail-preview.jsx"
export function MailList({ mails, isLoading, setMainShown, setSelectedMailId, criteria, onRemoveMail, onIsRead }) {
    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id} className={`mail-whole-preview ${mail.isRead ? 'mark-as-read' : 'mark-as-unread'}`} >
                <div className="mail-semi-whole-preview">
                    <MailPreview mail={mail} setMainShown={setMainShown} setSelectedMailId={setSelectedMailId} criteria={criteria} onRemoveMail={onRemoveMail} onIsRead={onIsRead} />
                </div>
                <hr />
            </li>)
        }
        {!mails.length && !isLoading && <h3 className="no-items">No items to show..</h3>}
    </ul>

}

