const { useState, useEffect } = React

// Service imports
import { mailService } from "../services/mail.service.js"
import { criteriaService } from "../services/criteria.service.js"
import { mailUserService } from "../services/mail-user.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
// Cmp imports
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailEdit } from "../cmps/mail-edit.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
import { MailSort } from "../cmps/mail-sort.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [criteria, setCriteria] = useState(criteriaService.getDefaultCriteria())
    const [showEdit, setShowEdit] = useState(false)
    const [mainShown, setMainShown] = useState('mailList')
    const [selectedMailId, setSelectedMailId] = useState('')
    const [unreadCount, setUnreadCount] = useState('')
    // Icons to update
    const [dateIcon, setDateIcon] = useState('up')
    const [subjectIcon, setSubjectIcon] = useState('up')
    // Loader to update
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getNoteParams()
    }, [])

    function getNoteParams() {
        // Get current params and set them in our variables
        let queryStringParams = new URLSearchParams(window.location.search)
        if (queryStringParams === '#/mail' || !queryStringParams) return

        // Extracts information from URL
        const subject = queryStringParams.get('subject')
        const body = queryStringParams.get('body')

        if (!subject || !body) return

        // A note was sent to mail, open compose
        const newMail = mailService.getEmptyMail()
        newMail.subject = subject
        newMail.body = body
        mailService.save(newMail).then((mailFromService) => {
            onSetEdit('', mailFromService.id)
            console.log('mailFromService.id:', mailFromService.id)
        })

        // Reset params
        queryStringParams = '#/mail'
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
    }

    function onSetEdit(ev, mailId) {
        if (ev) ev.stopPropagation()
        setSelectedMailId(mailId)
        setShowEdit(true)
    }

    useEffect(() => {
        setIsLoading(true)
        loadMails()
    }, [criteria])

    function loadMails() {
        mailService.query(criteria).then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsLoading(false)
            onUpdateUnreadCount()
        })
    }

    function onSetCriteria(criteriaName, criteriaVal) {
        criteria[criteriaName] = criteriaVal
        setCriteria({ ...criteria })
    }

    function onComposeMail(ev, mailToCompose) {
        ev.preventDefault()
        // Check if the sender is the reciever
        setShowEdit(false)
        setMainShown('mailList')
        mailToCompose.sentAt = Date.now()
        mailUserService.get().then(currUser => {
            if (mailToCompose.to === currUser.mail) {
                mailToCompose.status = ['sent', 'inbox']
                mailToCompose.from = 'Me'
                mailToCompose.to = 'Me'
            } else mailToCompose.status = ['sent']
            onUpdateMails(mailToCompose, 'Mail sent')
        })
    }

    function onExitMailToCompose(mailToDraft, intervalId, toAddMail) {
        if (intervalId) clearInterval(intervalId)
        setMainShown('mailList')
        setShowEdit(false)
        setSelectedMailId('')
        // Remove interval
        if (!toAddMail) return onSaveMail(mailToDraft)

        onUpdateMails(mailToDraft, 'Mail saved as draft', () => setShowEdit(false))
    }

    function onUpdateMails(mailToUpdate, txtMsg, func = () => '') {
        mailService.save(mailToUpdate).then((updatedMail) => {
            func()
            mails.unshift(updatedMail)
            setIsLoading(true)
            loadMails()
            if (txtMsg) showSuccessMsg(txtMsg)
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not update mails, try again please!')
        })
    }

    function onSaveMail(mailToDraft) {
        mailService.save(mailToDraft).then(() => {
            loadMails()
        }).catch((err) => {
            console.log('Had issues saving:', err)
            showErrorMsg('Could not draft mail, try again please!')
        })
    }

    function onRemoveMail(ev, mailToRemove) {
        ev.stopPropagation()
        if (!mailToRemove.status.includes('trash')) return onMoveToTrash(mailToRemove)

        mailService.remove(mailToRemove.id)
            .then((mailFromService) => {
                mails.unshift(mailFromService)
                setIsLoading(true)
                loadMails()
                showSuccessMsg('Mail removed')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove mail, try again please!')
            })
    }

    function onMoveToTrash(mailToRemove) {
        mailToRemove.status = ['trash']
        mailToRemove.removedAt = Date.now()
        onUpdateMails(mailToRemove, 'Mail moved to trash')
    }

    function onDateSort() {
        if (dateIcon === 'up') mailService.sortMail('sentAt', -1).then((mails) => {
            setMails(mails)
        })
        else mailService.sortMail('sentAt', 1).then((mails) => {
            setMails(mails)
        })
        setDateIcon((prevDirection) => prevDirection === 'up' ? 'down' : 'up')
    }

    function onSubjectSort() {
        if (subjectIcon === 'up') mailService.sortMail('subject', -1).then((mails) => {
            setMails(mails)
        })
        else mailService.sortMail('subject', 1).then((mails) => {
            setMails(mails)
        })

        setSubjectIcon((prevDirection) => prevDirection === 'up' ? 'down' : 'up')
    }

    function onIsRead(ev, mail) {
        ev.stopPropagation()
        mail.isRead = !mail.isRead
        onUpdateMails(mail)
    }

    function onIsStarred(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred
        onUpdateMails(mail)
    }

    function onUpdateUnreadCount() {
        mailService.getUnreadMails('status', 'inbox').then((mails) => {
            var inbox = mails.length
            mailService.getUnreadMails('isStarred', true).then((mails) => {
                var starred = mails.length
                mailService.getUnreadMails('status', 'sent').then((mails) => {
                    var sent = mails.length
                    mailService.getUnreadMails('status', 'draft').then((mails) => {
                        var draft = mails.length
                        setUnreadCount({
                            inbox,
                            starred,
                            sent,
                            draft
                        })
                    })
                })
            })
        })
    }

    function toggleMailMenu() {
        document.body.classList.toggle('mail-menu-open')
    }

    function onComposeClicked() {
        setShowEdit(true)
        toggleMailMenu()
    }

    return <section className="mail-index">

        <MailFilter onSetCriteria={onSetCriteria} setMainShown={setMainShown} />

        <section className="compose-btn-sect">
            <button className="compose-btn" onClick={onComposeClicked}>
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/compose-icon.png" />
                Compose
            </button>
            <hr />
        </section>

        <MailFolderList toggleMailMenu={toggleMailMenu} unreadCount={unreadCount} setMainShown={setMainShown} criteria={criteria} setCriteria={setCriteria} />

        {mainShown !== 'mailEdit' && <MailSort subjectIcon={subjectIcon} dateIcon={dateIcon} onSubjectSort={onSubjectSort} onDateSort={onDateSort} onSetCriteria={onSetCriteria} />}

        {!isLoading && mainShown === 'mailList' && <MailList mails={mails} onIsRead={onIsRead} isLoading={isLoading} onSetEdit={onSetEdit} setMainShown={setMainShown} setSelectedMailId={setSelectedMailId} criteria={criteria} onRemoveMail={onRemoveMail} onIsStarred={onIsStarred} />}

        {!isLoading && mainShown === 'mailDetails' && <MailDetails setIsLoading={setIsLoading} onIsRead={onIsRead} setMainShown={setMainShown} selectedMailId={selectedMailId} setSelectedMailId={setSelectedMailId} onRemoveMail={onRemoveMail} criteria={criteria} onIsStarred={onIsStarred} />}

        {showEdit && <MailEdit onUpdateMails={onUpdateMails} onSaveMail={onSaveMail} setMainShown={setMainShown} mainShown={mainShown} setShowEdit={setShowEdit} onExitMailToEdit={onExitMailToCompose} selectedMailId={selectedMailId} onEditMail={onComposeMail} />}

        {isLoading && <div className="mail-loader">Loading..</div>}

        <span className="mail-menu" onClick={toggleMailMenu}></span>

    </section>
}

