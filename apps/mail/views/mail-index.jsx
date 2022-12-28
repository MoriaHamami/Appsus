import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailList } from "../cmps/mail-list.jsx"

export function MailIndex() {
    return <section className="mail-index">
        <MailFilter />
        <MailNav />
        <MailList />
    </section>
}

