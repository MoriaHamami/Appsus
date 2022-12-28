import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, isLoading }) {

    return <ul className="mail-list">
        {
            mails.map(mail => <li key={mail.id}>
                <MailPreview mail={mail} />
                {/* <div>
                    <button>Star</button>
                    <Link to={`/mail/${mail.id}`}>Details</Link> |
                    <Link to={`/mail/edit/${mail.id}`}> Edit</Link>
                </div> */}
            </li>)
        }
        {!mails.length && !isLoading && <h3 className="no-items">No items to show..</h3>}

    </ul>

}

