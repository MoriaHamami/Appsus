const { useState, useEffect } = React

// import { showSuccessMsg } from "services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

// onst { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailCompose({ onComposeMail, setMainShown, mainShown, onExitMailToCompose }) {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    useEffect(() => {
        mailToEdit.status = ['draft']
    }, [])
    // const navigate = useNavigate()
    // const { mailId } = useParams()

    // useEffect(() => {
    //     if (!mailId) return
    //     loadMail()
    // }, [])

    // function loadMail() {
    //     mailService.get(mailId)
    //         .then((mail) => setMailToEdit(mail))
    //         .catch((err) => {
    //             console.log('Had issues in mail details', err)
    //             navigate('/mail')
    //         })
    // }

    function handleChange(ev) {
        // if(ev.currentTarget) {
        //     var value = ev.currentTarget.textContent
        //     mailToCompose.txt = value
        //     var field = 'txt'
        // } else {

        var { value, name: field } = ev.target
        // }
        console.log('value:', value)
        setMailToEdit((prevMail) => {
            return { ...prevMail, [field]: value }
        })
    }



    return <section className={`mail-compose ${mainShown === 'mailCompose' ? 'expand' : ''}`}>
        <header>New Message</header>
        <img className="expand-icon icon" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={() => setMainShown('mailCompose')} />
        <img className="close-icon icon" src="./assets/img/icons/icons-mail/close-icon.png"  onClick={() => onExitMailToCompose(mailToEdit)}/>
        <form className="compose-form" onSubmit={(ev) => onComposeMail(ev, mailToEdit)}>
            <label className="to-label">
                To
                <input className="to"
                    type="email"
                    name="to"
                    // value={mailToCompose.to}
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