const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteDetails } from "./apps/note/cmps/note-details.jsx"
// import { AppHeader } from "./cmps/app-header.jsx"

import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'
import { BookEdit } from './apps/book/views/book-edit.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { AboutTeam } from "./cmps/about-team.jsx"

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
                    {/* <Route element={<AboutTeam />} path="/about/team" /> */}
                {/* </Route> */}

                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail:info" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note:info" element={<NoteIndex />} />
                {/* <Route path="/note/:noteId" element={<NoteDetails />} /> */}

                {/* <Route path="/book" element={<BookIndex />} /> */}
                
                {/* <Router>
                    <section className="main-layout app">

                        <AppHeader /> */}

                            {/* <Routes> */}
                                {/* <Route element={<HomePage />} path="/" /> */}
                                    {/* <Route element={<AboutUs />} path="/aboutUs" /> */}
                                    <Route element={<BookIndex />} path="/book" />
                                    <Route element={<BookEdit />} path="/book/edit" />
                                    <Route element={<BookEdit />} path="/book/edit/:bookId" />
                                    <Route element={<BookDetails />} path="/book/:bookId" />
                            {/* </Routes> */}

                    {/* </section>
                </Router> */}


            </Routes>
                </section>
                <UserMsg />
    </Router>
}
