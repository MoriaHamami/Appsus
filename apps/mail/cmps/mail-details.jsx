const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

// import { MailLabels } from "../cmps/mail-labels.jsx"
import { mailService } from "../services/mail.service.js"

import { utilService } from "../services/util.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { ReviewList } from "../cmps/review-list.jsx"

export function MailDetails({mailId}) {

    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    // const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {

        mailService.get(mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })

        mailService.getNearbyMailIds(mailId)
            .then((nearbyMails) => {
                setNextMailId(nearbyMails.nextMailId)
                setPrevMailId(nearbyMails.prevMailId)
            })
    }

    function onGoBack() {
        navigate(-1)
    }

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
        <h2>{mail.title}</h2>

        <img onClick={onGoBack}/>
        <img onClick={() => setMail(prevMailId)}/>
        <img onClick={() => setMail(nextMailId)}/>
    </section>

}