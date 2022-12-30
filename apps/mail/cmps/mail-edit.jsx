const { useState, useEffect, useRef } = React

// import { showSuccessMsg } from "services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

// onst { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailEdit({ onUpdateMails, onSaveMail, onEditMail, setMainShown, mainShown, onExitMailToEdit, selectedMailId }) {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    let intervalIdRef = useRef(null)

    useEffect(() => {
        mailToEdit.status = ['draft']
        mailService.save(mailToEdit).then((mailFromStorage) => {
            setMailToEdit({ ...mailFromStorage, id: mailFromStorage.id })
            console.log('mailFromStorage:', mailFromStorage)
        })

        intervalIdRef.current = setInterval(() => {
            onSaveMail(mailToEdit)
            console.log('mailToEdit:', mailToEdit)
        }, 5000)

        return () => {
            if (intervalIdRef) clearInterval(intervalIdRef.current)
        }

    }, [])
    // const navigate = useNavigate()
    // const { selectedMailId } = useParams()

    useEffect(() => {
        if (!selectedMailId) return
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(selectedMailId)
            .then((mail) => setMailToEdit(mail))
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
        <img className="close-icon icon" src="./assets/img/icons/icons-mail/close-icon.png" onClick={() => onExitMailToEdit(mailToEdit, intervalIdRef.current)} />
        <form className="edit-form" onSubmit={(ev) => onEditMail(ev, mailToEdit)}>
            <label className="to-label">
                To
                <input className="to"
                    type="email"
                    name="to"
                    // value={mailToEdit.to}
                    onChange={handleChange}
                    required
                />
            </label>
            <hr />
            <label>
                <input className="subject"
                    type="text"
                    name="subject"
                    value={mailToEdit.subject}
                    placeholder="Subject"
                    onChange={handleChange}
                />
            </label>
            <hr />
            <label>
                <textarea className="txt"
                    type="text"
                    name="txt"
                    value={mailToEdit.txt}
                    onChange={handleChange}
                />
            </label>
            <hr />

            <button>Send</button>
        </form>
    </section>
}