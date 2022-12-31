const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (type === 'checkbox') value = target.checked
        setBookToEdit((prevBook) => {
            if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {
                return { ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }
            }

            return { ...prevBook, [field]: value }

        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        if (bookToEdit.authors.length && bookToEdit.authors.includes(',')) bookToEdit.authors = bookToEdit.authors.split(',')
        if (bookToEdit.categories.length && bookToEdit.categories.includes(',')) bookToEdit.categories = bookToEdit.categories.split(',')
        if (!bookToEdit.thumbnail) bookToEdit.thumbnail = './assets/img/book-imgs/default.jpg'
        bookService.save(bookToEdit).then((book) => {
            console.log('book saved', book);
            bookToEdit.id ? showSuccessMsg('Book saved') : showSuccessMsg('Book added')
            navigate('/book')
        }).catch((err) => {
            console.log('Had issues adding:', err)
            showErrorMsg('Could not add book, try again please!')
        })
    }

    return <section className="book-edit">
        <h2>{bookToEdit.id ? 'Edit this book' : 'Add a new book'}</h2>

        <form onSubmit={onSaveBook}>
            <div>
                <label htmlFor="title">Title : </label>
                <input type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title..."
                    value={bookToEdit.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="subtitle">Subtitle : </label>
                <input type="text"
                    name="subtitle"
                    id="subtitle"
                    placeholder="Enter book subtitle..."
                    value={bookToEdit.subtitle}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="authors">Authors: </label>
                <input type="text"
                    name="authors"
                    id="authors"
                    placeholder="Enter authors..."
                    value={bookToEdit.authors}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="thumbnail">Thumbnail : </label>
                <input type="url"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="https://example.com"
                    value={bookToEdit.thumbnail === './assets/img/book-imgs/default.jpg' ? '' : bookToEdit.thumbnail}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="description">Description : </label>
                <input type="text"
                    name="description"
                    id="description"
                    placeholder="Enter book description..."
                    value={bookToEdit.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="publishedAt">Published Date : </label>
                <input type="date"
                    name="publishedAt"
                    id="publishedAt"
                    placeholder="Enter book publishedAt..."
                    value={bookToEdit.publishedAt}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="categories">Categories : </label>
                <input type="list"
                    name="categories"
                    id="categories"
                    placeholder="e.x Drama, Action.."
                    value={bookToEdit.categories}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="pageCount">Page Count: </label>
                <input type="number"
                    name="pageCount"
                    id="pageCount"
                    placeholder="Enter page count.."
                    value={bookToEdit.pageCount}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="amount">Price: </label>
                <input type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter price.."
                    value={bookToEdit.amount}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="isOnSale">Is on Sale: </label>
                <input type="checkbox"
                    name="isOnSale"
                    id="isOnSale"
                    value={bookToEdit.isOnSale}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
                <Link to="/book">Cancel</Link>
            </div>
        </form>
    </section >
}
