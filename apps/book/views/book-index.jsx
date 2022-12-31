const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookAdd } from '../cmps/book-add.jsx'

import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { bookService } from '../services/book.service.js'


export function BookIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg('Book removed')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
    }

    function onAddGoogleBook(googleBook) {

        if (books.find(book => book.title === googleBook.volumeInfo.title)) return showErrorMsg('Book already in list')

        bookService.addGoogleBook(googleBook).then((newBook) => {
            books.push(newBook)
            setBooks(books.slice())
            showSuccessMsg('Book added!')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not add book, try again please!')
        })
    }

    return <section className="book-index">

        <div className='main-layout'>
            <BookFilter onSetFilter={onSetFilter} />
            <Link to="/book/edit">Add Book</Link>
            <BookAdd onAddGoogleBook={onAddGoogleBook} />
            {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
            {isLoading && <div>Loading..</div>}
            {!books.length && <div>No items to show..</div>}
        </div>

    </section>
}
