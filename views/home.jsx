const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <h1>Welcome to Appsus</h1>
        
        <Link to="/mail"><img src="/assets/img/icons/icons-mail/miss-mail-logo.png" alt="email" /></Link>
        <Link to="/note"><img src="/assets/img/icons/icons-notes/note-logo.png" alt="note" /></Link>
        <Link to="/book"><img src="/assets/img/icons/icons-book/book-logo.png" alt="book" /></Link>


    </section>
}