const { useState } = React

import { mailService } from "../services/mail.service.js"

// onst { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM
export function MailCompose({onComposeMail}) {

    const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())

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

    function handleChange({ target }) {
        let { value, name: field } = target
        setMailToCompose((prevMail) => {
            return { ...prevMail, [field]: value }
        })
    }

    return <section className="mail-compose">
        <div>New Message</div>
        <form className="compose-form" onSubmit={onComposeMail}>
            <label className="compose to">Min speed:
                <input type="email"
                    name="to"
                    value={mailToCompose.to}
                    onChange={handleChange}
                />
            </label>
            <label className="compose subject">
                <input type="text"
                    name="subject"
                    value={mailToCompose.subject}
                    placeholder="Subject"
                    onChange={handleChange}
                />
            </label>
            <label className="compose txt">
                <input type="text"
                    name="txt"
                    value={mailToCompose.txt}
                    onChange={handleChange}
                />
            </label>
            <button>Send</button>
        </form>
    </section>
}