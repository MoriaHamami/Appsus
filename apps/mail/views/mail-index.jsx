const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { criteriaService } from "../services/criteria.service.js"
import { mailUserService } from "../services/mail-user.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [criteria, setCriteria] = useState(criteriaService.getDefaultCriteria())
    const [showCompose, setShowCompose] = useState(false)
    const [mainShown, setMainShown] = useState('mailList')
    const [selectedMailId, setSelectedMailId] = useState('')
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
        setCriteria({ ...criteria })
    }

    function onComposeMail(ev, mailToCompose) {
        ev.preventDefault()
        // Check if the sender is the reciever
        setShowCompose(false)
        setMainShown('mailList')

        if (mailToCompose.to === mailUserService.get().email) mailToCompose.status = ['sent', 'inbox']
        else mailToCompose.status = ['sent']

        console.log('mailToCompose:', mailToCompose)
        mailService.save(mailToCompose).then((composedMail) => {
            showSuccessMsg('Mail sent!')
            // navigate('/mail')
            mails.unshift(composedMail)
            const newMails = mails.slice()
            setMails(newMails)
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not add mail, try again please!')
        })
    }

    function onExitMailToCompose(mailToDraft) {
        setMainShown('mailList')
        setShowCompose(false)

        mailService.save(mailToDraft).then((draftedMail) => {
            setShowCompose(false)
            mails.unshift(draftedMail)
            const newMails = mails.slice()
            setMails(newMails)
            showSuccessMsg('Mail saved as draft')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not draft mail, try again please!')
        })
    }

    return <section className="mail-index">
        <MailFilter onSetCriteria={onSetCriteria} setMainShown={setMainShown} />
        <section className="compose-btn-sect">
            <button className="compose-btn" onClick={() => setShowCompose(true)}>
                <img className="list-icon icon" src="../../assets/img/icons/icons-mail/compose-icon.png" />
                Compose
            </button>
            <hr />
        </section>
        <MailFolderList criteria={criteria} setCriteria={setCriteria}/>
        {!isLoading && mainShown === 'mailList' && <MailList mails={mails} isLoading={isLoading} setMainShown={setMainShown} setSelectedMailId={setSelectedMailId} />}
        {!isLoading && mainShown === 'mailDetails' && <MailDetails setIsLoading={setIsLoading} setMainShown={setMainShown} selectedMailId={selectedMailId} setSelectedMailId={setSelectedMailId} />}
        {showCompose && <MailCompose onComposeMail={onComposeMail} setMainShown={setMainShown} mainShown={mainShown} setShowCompose={setShowCompose} onExitMailToCompose={onExitMailToCompose} />}
        {isLoading && <div>Loading..</div>}
    </section>
}

