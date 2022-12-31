const { useEffect, useState, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
// import { MailLabels } from "../cmps/mail-labels.jsx"
import { mailService } from "../services/mail.service.js"

// import { utilService } from "../services/util.service.js"
// import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function MailDetails({ setIsLoading, setMainShown, selectedMailId, setSelectedMailId, onRemoveMail, criteria, onIsRead, onIsStarred }) {

    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    const [timeSince, setTimeSince] = useState(null)
    // const { selectedMailId } = useParams()

    // let intervalIdRef = useRef(null)

    useEffect(() => { 

        loadMail()
        // .then((mail) =>{
        //     intervalIdRef = setInterval(() => {
        //         if (criteria.status === 'trash') onSetTimeSince(mail.removedAt)
        //         else onSetTimeSince(mail.sentAt)
        //         loadMail()
        //         console.log('mail.sentAt:', mail.sentAt)
        //     }, 1000)
        // })

        // return () => {
        //     if (intervalIdRef) clearInterval(intervalIdRef.current)
        // }

    }, [])

    useEffect(() => {
        // setIsLoading(true)
        loadMail()
    }, [selectedMailId])

    function loadMail() {

        mailService.get(selectedMailId)
            .then((mail) => {
                setMail(mail)
                setIsLoading(false)
                return mail
            // })
            })
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })
        // .then(() => {
        //     console.log('mail:', mail)



        // mailService.getNearbyMailIds(selectedMailId)
        //     .then((nearbyMails) => {
        //         setNextMailId(nearbyMails.nextMailId)
        //         setPrevMailId(nearbyMails.prevMailId)
        //     })
    }

    // MOVE TO UTILS? SET TIME INTERVAL TO UPDATE?
    function onSetTimeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000)

        var interval = seconds / 31536000

        if (interval > 1) {
            return Math.floor(interval) + " years ago"
        }
        interval = seconds / 2592000
        if (interval > 1) {
            return Math.floor(interval) + " months ago"
        }
        interval = seconds / 86400
        if (interval > 1) {
            return Math.floor(interval) + " days ago"
        }
        interval = seconds / 3600
        if (interval > 1) {
            return Math.floor(interval) + " hours ago"
        }
        interval = seconds / 60
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago"
        }
        return Math.floor(seconds) + " seconds ago"

    }

    // function onRemoveMailFromDetails() {
    //     onRemoveMail(mail)
    //     // setMainShown('mailList')
    // }
    // function onGoBack() {
    //     navigate(-1)
    //     // navigate('/mail')
    // }

    // Put this func in index to remove mail
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

    // function onSaveReview(mailToSave) {
    //     const newMail = { ...mailToSave }
    //     mailService.save(newMail)
    //         .then((mailFromService) => {
    //             setMail(mailFromService)
    //             showSuccessMsg('Review added!')
    //         })
    // }

    if (!mail) return <div>Loading...</div>
    return <section className="mail-details">

        {/* <img className="close-icon icon" src="../../assets/img/icons/icons-mail/close-icon.png" onClick={() => setMainShown('mailList')} /> */}
        <img className="back-icon icon" src="./assets/img/icons/icons-mail/back-icon.png" onClick={() => setMainShown('mailList')} />
        {/* <img className="icon" src={`./assets/img/icons/icons-mail/${mail.isRead ? 'mark-as-read' : 'mark-as-unread'}.png`} onClick={(ev) => onIsRead(ev, mail)} />
        <img className="delete-icon icon" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} /> */}
        {!mail.isRead && <img className="icon" title="Mark as read" src="./assets/img/icons/icons-mail/mark-as-read.png" onClick={(ev) => onIsRead(ev, mail)} />}
        {mail.isRead && <img className="icon" title="Mark as unread" src="./assets/img/icons/icons-mail/mark-as-unread.png" onClick={(ev) => onIsRead(ev, mail)} />}
        <img className="delete-icon icon" title="Delete" src="./assets/img/icons/icons-mail/delete-icon.png" onClick={(ev) => onRemoveMail(ev, mail)} />
        {mail.isStarred && <img className="icon star starred" title="Starred" src="./assets/img/icons/icons-mail/starred-icon.png" onClick={(ev) => { onIsStarred(ev, mail) }} />}
        {!mail.isStarred && <img className="icon star" title="Not starred" src="./assets/img/icons/icons-mail/star-icon.png" onClick={(ev) => { onIsStarred(ev, mail) }} />}
        {/* <img className="nav-icon prev-icon icon" src="./assets/img/icons/icons-mail/prev-icon.png" onClick={() => setMail(prevMailId)} />
        <img className=" nav-icon next-icon icon" src="./assets/img/icons/icons-mail/next-icon.png" onClick={() => setMail(nextMailId)} /> */}
        {!(criteria.status === 'trash') && <span className="date">{mail.sentAt ? onSetTimeSince(mail.sentAt) : ''}</span>}
        {criteria.status === 'trash' && <span className="date">{mail.sentAt ? onSetTimeSince(mail.removedAt) : ''}</span>}

        <h2 className="subject">{mail.subject}</h2>
        <h3 className="from">{mail.from}</h3>
        <h4 className="to">{mail.to}</h4>
        {/* {!(criteria.status === 'trash') && <span className="date">{utilService.getDate(mail.sentAt)}</span>}
        {criteria.status === 'trash' && <span className="date">{utilService.getDate(mail.removedAt)}</span>} */}
        {/* <span className="date">{timeSince}</span> */}
        <p className="body">{mail.body}</p>

    </section>

}