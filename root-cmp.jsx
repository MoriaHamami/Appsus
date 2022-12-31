const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteDetails } from "./apps/note/cmps/note-details.jsx"

export function App() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return <Router>
        <section className="app">
        <div className="main-screen" onClick={toggleMenu}></div>
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail:info" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note:info" element={<NoteIndex />} />
                {/* <Route path="/note/:noteId" element={<NoteDetails />} /> */}

                {/* <Route path="/book" element={<BookIndex />} /> */}
            </Routes>
        </section>
    </Router>
}
