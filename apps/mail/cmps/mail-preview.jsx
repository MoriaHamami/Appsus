const { useState } = React

export function MailPreview({ mail }) {

    const [ isToExpand, setToExpand ] = useState(false)

    return <article className="mail-preview" onClick={() => setToExpand(isToExpand => !isToExpand)}>
        <span className="preview from">{mail.from}</span>
        <span className="preview subject">{mail.subject}</span>

        {
            isToExpand &&
            <article className="mail-expand">
                <h3 className="expand from">{mail.from}</h3>
                <h4 className="expand subject">{mail.subject}</h4>
                <p className="expand body">{mail.body}</p>
            </article>
        }
    </article>
}