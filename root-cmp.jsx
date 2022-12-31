const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

// Base imports
import { Home } from "./views/home.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { UserMsg } from './cmps/user-msg.jsx'
// Mail imports
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
// Note imports
import { NoteIndex } from "./apps/note/views/note-index.jsx"
// Book imports
import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'
import { BookEdit } from './apps/book/views/book-edit.jsx'

export function App() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    function toggleMailMenu() {
        document.body.classList.toggle('mail-menu-open')
    }

    return <Router>
        <section className="app">

            <div className="main-screen" onClick={toggleMenu}></div>
            <div className="mail-screen" onClick={toggleMailMenu}></div>
            
            <AppHeader />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail:info" element={<MailIndex />} />

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note:info" element={<NoteIndex />} />

                <Route path="/book" element={<BookIndex />}  />
                <Route path="/book/edit" element={<BookEdit />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
                <Route path="/book/:bookId" element={<BookDetails />} />


            </Routes>
        </section>t
        
        <UserMsg />

    </Router>
}
