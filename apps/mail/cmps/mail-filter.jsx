export function MailFilter({ onSetCriteria }) {

    return <section className="mail-filter">
        <input type="image"
            className="search-icon"
            src="./assets/img/icons/icons-mail/search-icon.png"
        />
        <input type="search"
            className="search-input"
            id="search-mail"
            name="search"
            placeholder="Search"
            onChange={(ev) => onSetCriteria('txt', ev.target.value)}
        />
    </section>

}
