const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { googleBookService } from "../services/google.book.service.js"
import { utilService } from "../../../services/util.service.js"

export function BookAdd({ onAddGoogleBook }) {

    const [googleBooks, setGoogleBooks] = useState([])

    const navigate = useNavigate()
    const debouncedSearchTerm = useRef(null)

    useEffect(() => {
        loadGoogleBookList()
        debouncedSearchTerm.current = utilService.debounce(loadGoogleBookList)
    }, [])

    function loadGoogleBookList(txt = '') {
        googleBookService.query(txt)
        .then(booksToUpdate => {
            setGoogleBooks(booksToUpdate)
        })
        .catch((err) => {
            console.log('Had issues in book details:', err)
            navigate('/book')
        })
    }

    function handleChange(ev) {
        ev.preventDefault()
        const value = ev.target.value
        debouncedSearchTerm.current(value)
    }

    return <section className="book-add">
        <label>
            <input type="search"
                placeholder="Search book to add"
                onChange={handleChange}
                 />
        </label>
        <ul className="google-books">
            {
                googleBooks.map(book =>
                    <section>
                        <li key={book.id}>
                            {book.volumeInfo.title}
                        </li>
                        <button onClick={() => onAddGoogleBook(book)}>+</button>
                    </section>
                )
            }
        </ul>
    </section>
}

