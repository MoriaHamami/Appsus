const { useState, useEffect, useRef } = React

import { utilService } from "../../../services/util.service.js"
// import { showSuccessMsg } from "services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

// onst { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailEdit({ onUpdateMails, onSaveMail, onEditMail, setMainShown, mainShown, onExitMailToEdit, selectedMailId }) {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const [isMailToAdd, setIsMailToAdd] = useState(true)

    let intervalIdRef = useRef(null)

    useEffect(() => {

        mailToEdit.status = ['draft']

        if (selectedMailId) { // If we need to edit
            loadMail().then((mail) => {
                intervalIdRef.current = setInterval(() => {
                    onSaveMail(mail)
                    // console.log('mailToEdit:', mail)
                }, 5000)
                setIsMailToAdd(false)
            })
        } else { // If we need to compose //TODO RENDER EACH TIME
            // mailToEdit.id = utilService.makeId()
            mailService.save(mailToEdit).then((mailFromStorage) => {
                const newMail = { ...mailFromStorage }
                setMailToEdit(newMail)
                // console.log('mailFromStorage:', mailFromStorage)

                // useState is an async func, so we must define the needed data without delay
                mailToEdit.id = mailFromStorage.id

                intervalIdRef.current = setInterval(() => {
                    onSaveMail(mailToEdit)
                    console.log('mailToEdit:', mailToEdit)
                }, 5000)
            })
        }

        // if (!selectedMailId) return


        return () => {
            if (intervalIdRef) clearInterval(intervalIdRef.current)
        }

    }, [])
    // const navigate = useNavigate()
    // const { selectedMailId } = useParams()

    // useEffect(() => {

    // }, [])

    function loadMail() {
        return mailService.get(selectedMailId)
            .then((mail) => {
                setMailToEdit(mail)
                return mail
            })
            .catch((err) => {
                console.log('Had issues in mail details', err)
                navigate('/mail')
            })
    }

    function handleChange(ev) {
        // if(ev.currentTarget) {
        //     var value = ev.currentTarget.textContent
        //     mailToEdit.txt = value
        //     var field = 'txt'
        // } else {
        var { value, name: field } = ev.target
        // }
        console.log('value:', value)
        setMailToEdit((prevMail) => {
            return { ...prevMail, [field]: value }
        })
    }


    return <section className={`mail-edit ${mainShown === 'mailEdit' ? 'expand' : ''}`}>
        <header>New Message</header>
        <img className="expand-icon icon" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={() => setMainShown('mailEdit')} />
        <img className="close-icon icon" src="./assets/img/icons/icons-mail/close-icon.png" onClick={() => onExitMailToEdit(mailToEdit, intervalIdRef.current, isMailToAdd)} />
        <form className="edit-form" onSubmit={(ev) => onEditMail(ev, mailToEdit)}>
            <div className="underline">
                <label className="to-label">
                    To
                    <input className="to"
                        type="email"
                        name="to"
                        value={mailToEdit.to}
                        onChange={handleChange}
                        required
                    />
                </label >
            </div>
            {/* <hr /> */}
            <div className="underline">

                <label >
                    <input className="subject"
                        type="text"
                        name="subject"
                        value={mailToEdit.subject}
                        placeholder="Subject"
                        onChange={handleChange}
                    />
                </label>
            </div>
            {/* <hr /> */}
            <div className="underline">

                <label >
                    <textarea className="body"
                        type="text"
                        name="body"
                        value={mailToEdit.body}
                        onChange={handleChange}
                    />
                </label>
            </div>
            {/* <hr /> */}

            <button>Send</button>
        </form>
    </section>
}