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
import { MailSort } from "../cmps/mail-sort.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [criteria, setCriteria] = useState(criteriaService.getDefaultCriteria())
    const [showCompose, setShowCompose] = useState(false)
    const [mainShown, setMainShown] = useState('mailList')
    const [selectedMailId, setSelectedMailId] = useState('')
    const [unreadCount, setUnreadCount] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
        console.log('criteria2:', criteria)
        setCriteria({ ...criteria })
    }

    function onComposeMail(ev, mailToCompose) {
        ev.preventDefault()
        // Check if the sender is the reciever
        setShowCompose(false)
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

        console.log('mailToCompose:', mailToCompose)
        // mailService.save(mailToCompose).then((composedMail) => {
        //     // navigate('/mail')
        //     mails.unshift(composedMail)
        //     setIsLoading(true)
        //     loadMails()
        //     showSuccessMsg('Mail sent!')
        // }).catch((err) => {
        //     console.log('Had issues adding:', err)
        //     showErrorMsg('Could not add mail, try again please!')
        // })
    }

    function onExitMailToCompose(mailToDraft) {
        setMainShown('mailList')
        setShowCompose(false)
        onUpdateMails(mailToDraft, 'Mail saved as draft', () => setShowCompose(false))
        // mailService.save(mailToDraft).then((draftedMail) => {
        //     setShowCompose(false)
        //     mails.unshift(draftedMail)
        //     setIsLoading(true)
        //     loadMails()
        //     showSuccessMsg('Mail saved as draft')
        // }).catch((err) => {
        //     console.log('Had issues adding:', err)
        //     showErrorMsg('Could not draft mail, try again please!')
        // })
    }

    function onUpdateMails(mailToUpdate, txtMsg, func = () => '') {
        mailService.save(mailToUpdate).then((updatedMail) => {
            func()
            mails.unshift(updatedMail)
            setIsLoading(true)
            loadMails()
            if(txtMsg) showSuccessMsg(txtMsg)
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not update mails, try again please!')
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

    // function onRemoveReview(mail, reviewIdx) {
    //     mail.reviews.splice(reviewIdx, 1)
    //     // We must create a new pointer in order to render the mail again
    //     const newMail = { ...mail }
    //     mailService.save(newMail)
    //         .then((mailFromService) => {
    //             showSuccessMsg('Mail removed')
    //             setMail(mailFromService)
    //         })
    //         .catch((err) => {
    //             console.log('Had issues removing', err)
    //             showErrorMsg('Could not remove mail, try again please!')
    //         })
    // }

    function onIsRead(ev, mail) {
        ev.stopPropagation()
        mail.isRead = !mail.isRead 
        onUpdateMails(mail)
        // setMails([...mails])
        // loadMails()
    }
    
    function onIsStarred(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred 
        onUpdateMails(mail)
        // setMails([...mails])
        // loadMails()
    }

    function onUpdateUnreadCount() {
        // mailService.getUnreadMails().then(mails => setUnreadCount(mails.length))
        mailService.getUnreadMails('status', 'inbox').then((mails) => {
                var inbox = mails.length
                console.log('mails:', mails)
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

    return <section className="mail-index">
        {console.log(unreadCount)}
        <MailFilter onSetCriteria={onSetCriteria} setMainShown={setMainShown} />
        <section className="compose-btn-sect">
            <button className="compose-btn" onClick={() => setShowCompose(true)}>
                <img className="list-icon icon" src="./assets/img/icons/icons-mail/compose-icon.png" />
                Compose
            </button>
            <hr />
        </section>
        <MailSort />
        <MailFolderList unreadCount={unreadCount} setMainShown={setMainShown} criteria={criteria} setCriteria={setCriteria} />
        {!isLoading && mainShown === 'mailList' && <MailList mails={mails} onIsRead={onIsRead} isLoading={isLoading} setMainShown={setMainShown} setSelectedMailId={setSelectedMailId} criteria={criteria} onRemoveMail={onRemoveMail} onIsStarred={onIsStarred} />}
        {!isLoading && mainShown === 'mailDetails' && <MailDetails setIsLoading={setIsLoading} onIsRead={onIsRead} setMainShown={setMainShown} selectedMailId={selectedMailId} setSelectedMailId={setSelectedMailId} onRemoveMail={onRemoveMail} criteria={criteria} onIsStarred={onIsStarred}/>}
        {showCompose && <MailCompose onComposeMail={onComposeMail} setMainShown={setMainShown} mainShown={mainShown} setShowCompose={setShowCompose} onExitMailToCompose={onExitMailToCompose} />}
        {isLoading && <div>Loading..</div>}
    </section>
}

