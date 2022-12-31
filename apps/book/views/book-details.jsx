const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

// import { BookLabels } from "../cmps/book-labels.jsx"
import { LongTxt } from "../cmps/long-txt.jsx"
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/add-review.jsx"

import { utilService } from "../../../services/util.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"
import { ReviewList } from "../cmps/review-list.jsx"

export function BookDetails() {

    const [book, setBook] = useState(null)
    const navigate = useNavigate()
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {

        bookService.get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })

        bookService.getNearbyBookIds(bookId)
            .then((nearbyBooks) => {
                setNextBookId(nearbyBooks.nextBookId)
                setPrevBookId(nearbyBooks.prevBookId)
            })
    }

    function onGoBack() {
        navigate(-1)
    }

    function getPageCountTxt(book) {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
        else return null
    }

    function getPublishedDateTxt(book) {
        const currDate = new Date()
        const currYear = currDate.getFullYear()
        if (book.publishedDate + 10 > currYear) return 'Vintage'
        else if (book.publishedDate === currYear) return 'New'
        else return null
    }

    function getPriceColor(book) {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return 'black'
    }

    function onRemoveReview(book, reviewIdx) {
        book.reviews.splice(reviewIdx, 1)
        // We must create a new pointer in order to render the book again
        const newBook = { ...book }
        bookService.save(newBook)
            .then((bookFromService) => {
                showSuccessMsg('Book removed')
                setBook(bookFromService)
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
    }

    function onSaveReview(bookToSave) {
        const newBook = { ...bookToSave }
        bookService.save(newBook)
            .then((bookFromService) => {
                setBook(bookFromService)
                showSuccessMsg('Review added!')
            })
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details">
        <h2>{book.title}</h2>
        {book.subtitle && <p>{book.subtitle}</p>}
        {book.authors && <p>Author: {book.authors.join(', ')}</p>}
        {/* <img src={book.thumbnail} alt="../assets/img/default.jpg" /> */}
        <img src={book.thumbnail} />
        {book.description && <LongTxt txt={book.description} length={50} />}
        {book.publishedDate && <p>Published date: {book.publishedDate}</p>}
        {book.categories && <p>Categories: {book.categories.join(', ')}</p>}
        {book.language && <p>Language: {book.language}</p>}
        {book.pageCount && <p>Page count: {book.pageCount}</p>}
        {book.listPrice.amount && <h4 style={{ color: getPriceColor(book) }}>Price: {utilService.getAmount(book.listPrice.amount, book.listPrice.currencyCode)}</h4>}
        {getPageCountTxt(book) && <div>{getPageCountTxt(book)}</div>}
        {getPublishedDateTxt(book) && <div>{getPublishedDateTxt(book)}</div>}

        <button onClick={onGoBack}>Go Back</button>
        <Link to={`/book/edit/${book.id}`}>Edit me</Link>

        <AddReview book={book} onSaveReview={onSaveReview} />
        <ReviewList book={book} onRemoveReview={onRemoveReview} />
        
        <Link to={`/book/${nextBookId}`}>Next Book</Link>
        <Link to={`/book/${prevBookId}`}>Previous Book</Link>
    </section>

}