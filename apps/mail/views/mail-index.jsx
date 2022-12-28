const { useState, useEffect } = React

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { criteriaService } from "../services/criteria.service.js"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [criteria, setCriteria] = useState(criteriaService.getDefaultCriteria())

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [criteria])

    function loadMails() {
        mailService.query(criteria).then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsLoading(false)
        })
    }

    function onSetCriteria(criteriaName, criteriaVal) {
        criteria[criteriaName] = criteriaVal
        console.log('criteria2:', criteria)
        setCriteria({...criteria})
    }

    return <section className="mail-index">
        <MailFilter onSetCriteria={onSetCriteria}/>
        <MailNav onSetCriteria={onSetCriteria}/>
        {!isLoading && <MailList mails={mails} isLoading={isLoading} />}
        {isLoading && <div>Loading..</div>}
    </section>
}

