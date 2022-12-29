const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

// import { MailLabels } from "../cmps/mail-labels.jsx"
import { mailService } from "../services/mail.service.js"

// import { utilService } from "../services/util.service.js"
// import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function MailDetails({ setIsLoading, setMainShown, selectedMailId, setSelectedMailId }) {

    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    // const { selectedMailId } = useParams()

    useEffect(() => {
        // setIsLoading(true)
        loadMail()
    }, [selectedMailId])

    function loadMail() {

        mailService.get(selectedMailId)
            .then((mail) => {
                setMail(mail)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })

        mailService.getNearbyMailIds(selectedMailId)
            .then((nearbyMails) => {
                setNextMailId(nearbyMails.nextMailId)
                setPrevMailId(nearbyMails.prevMailId)
            })
    }

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
        <img className="back-icon icon" src="../../assets/img/icons/icons-mail/back-icon.png" onClick={() => setMainShown('mailList')} />

        <h3 className="from">{mail.from}</h3>
        <h4 className="subject">{mail.subject}</h4>
        <p className="body">{mail.body}</p>


        <img className="prev-icon icon" src="../../assets/img/icons/icons-mail/prev-icon.png" onClick={() => setMail(prevMailId)} />
        <img className="next-icon icon" src="../../assets/img/icons/icons-mail/next-icon.png" onClick={() => setMail(nextMailId)} />
    </section>

}