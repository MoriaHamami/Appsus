const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { criteriaService } from "../services/criteria.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [criteria, setCriteria] = useState(criteriaService.getDefaultCriteria())
    const [showCompose, setShowCompose] = useState(true)

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

    function onComposeMail(ev, mailToCompose) {
        ev.preventDefault()
        console.log('mailToCompose:', mailToCompose)
        mailService.save(mailToCompose).then((composedMail) => {
            setShowCompose(false)
            mailToEdit.id ? showSuccessMsg('Mail saved!') : showSuccessMsg('Mail added!')
            // navigate('/mail')
            const updatedMails = mails.push(composedMail)
            setMails(updatedMails.slice())
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not add mail, try again please!')
        })
    }

    function onToCompose() {
        setShowCompose(true)
    }

    return <section className="mail-index">
        <MailFilter onSetCriteria={onSetCriteria} />
        <MailFolderList onSetCriteria={onSetCriteria} onToCompose={onToCompose} />
        {!isLoading && <MailList mails={mails} isLoading={isLoading} />}
        {isLoading && <div>Loading..</div>}
        <MailCompose onComposeMail={onComposeMail} />
    </section>
}

