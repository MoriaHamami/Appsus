const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

export function MailEdit({ onSaveMail, onEditMail, setMainShown, mainShown, onExitMailToEdit, selectedMailId }) {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const [isMailToAdd, setIsMailToAdd] = useState(true)

    let intervalIdRef = useRef(null)

    useEffect(() => {

        mailToEdit.status = ['draft']
        if (selectedMailId) { // If we need to edit

            loadMail().then((mail) => {
                intervalIdRef.current = setInterval(() => {
                    onSaveMail(mail)
                }, 5000)
                setIsMailToAdd(false)
            })
        } else { // If we need to compose //TODO RENDER EACH TIME
            mailService.save(mailToEdit).then((mailFromStorage) => {
                const newMail = { ...mailFromStorage }
                setMailToEdit(newMail)
                mailToEdit.id = mailFromStorage.id
                intervalIdRef.current = setInterval(() => {
                    onSaveMail(mailToEdit)
                    console.log('mailToEdit:', mailToEdit)
                }, 5000)
            })
        }

        return () => {
            if (intervalIdRef) clearInterval(intervalIdRef.current)
        }

    }, [])

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
        var { value, name: field } = ev.target
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

            <button>Send</button>

        </form>

    </section>
}