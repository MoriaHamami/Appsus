const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookAdd } from '../cmps/book-add.jsx'
// import { BookDetails } from './book-details.jsx'

import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"
import { bookService } from '../services/book.service.js'
// import { UserMsg } from '../cmps/user-msg.jsx'
// import { BookEdit } from '../cmps/book-edit.jsx'

export function BookIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    // const [bookToAdd, setBookToAdd] = useState(bookService.getEmptyBook())
    const [books, setBooks] = useState([])
    // const [selectedBook, setSelectedBook] = useState(null)
    // const [userMsg, setUserMsg] = useState('')

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

    // Remove id because storage adds one
    // function onBookToAdd(book) {
    //     bookService.post(bookId).then(() => {
    //         setBooks([...books, book]])
    //         setBookToAdd(null)
    //         flashMsg('Book added!')
    //     })
    // }

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
        // if (googleBookToAdd.authors.length && googleBookToAdd.authors.includes(',')) googleBookToAdd.authors = googleBookToAdd.authors.split(',')
        // if (googleBookToAdd.categories.length && googleBookToAdd.categories.includes(',')) googleBookToAdd.categories = googleBookToAdd.categories.split(',')
        // if (!googleBookToAdd.thumbnail) googleBookToAdd.thumbnail = '../assets/img/default.jpg'
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
    // function onSelectBook(bookId) {
    //     bookService.get(bookId).then((book) => {
    //         setSelectedBook(book)
    //     })
    // }

    // function flashMsg(msg) {
    //     setUserMsg(msg)
    //     setTimeout(() => {
    //         setUserMsg('')
    //     }, 3000)
    // }

    // if (!books) return <h1>Loading...</h1>
    return <section className="book-index">
        {/* {userMsg && <UserMsg msg={userMsg} />} */}

        {/* ADDD??? */}
        {/* <main className="full main-layout">
        </main> */}

        <div className='main-layout'>
            <BookFilter onSetFilter={onSetFilter} />
            <Link to="/book/edit">Add Book</Link>
            <BookAdd onAddGoogleBook={onAddGoogleBook} />
            {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
            {isLoading && <div>Loading..</div>}
            {!books.length && <div>No items to show..</div>}
        </div>

        {/* {selectedBook && <BookDetails
            book={selectedBook}
            onGoBack={() => setSelectedBook(null)}
        />} */}

        {/* <button onClick={onBookToAdd}>Add Book</button> */}
        {/* {bookToAdd && <BookEdit onBookToAdd={onbookToAdd} />} */}
    </section>
}
