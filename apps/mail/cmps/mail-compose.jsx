// const { useState, useEffect } = React

// import { mailService } from "../services/mail.service.js"

// export function MailCompose({ onComposeMail, setMainShown, mainShown, onExitMailToCompose }) {

//     const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())

//     useEffect(() => {
//         mailToCompose.status = ['draft']
//     }, [])

//     function handleChange(ev) {
//         var { value, name: field } = ev.target
//         console.log('value:', value)
//         setMailToCompose((prevMail) => {
//             return { ...prevMail, [field]: value }
//         })
//     }



//     return <section className={`mail-compose ${mainShown === 'mailCompose' ? 'expand' : ''}`}>
//         <header>New Message</header>
//         <img className="expand-icon icon" src="./assets/img/icons/icons-mail/expand-icon.png" onClick={() => setMainShown('mailCompose')} />
//         <img className="close-icon icon" src="./assets/img/icons/icons-mail/close-icon.png"  onClick={() => onExitMailToCompose(mailToCompose)}/>
//         <form className="compose-form" onSubmit={(ev) => onComposeMail(ev, mailToCompose)}>
//             <label className="to-label">
//                 To
//                 <input className="to"
//                     type="email"
//                     name="to"
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <hr />
//             <label>
//                 <input className="subject"
//                     type="text"
//                     name="subject"
//                     value={mailToCompose.subject}
//                     placeholder="Subject"
//                     onChange={handleChange}
//                 />
//             </label>
//             <hr />
//             <label>
//                 <textarea className="txt"
//                     type="text"
//                     name="txt"
//                     value={mailToCompose.txt}
//                     onChange={handleChange}
//                 />
//             </label>
//             <hr />
//             <button>Send</button>
//         </form>
//     </section>
// }