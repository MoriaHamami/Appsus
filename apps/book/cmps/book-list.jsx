const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx"

export function BookList({ books, onRemoveBook, onSelectBook }) {

    return <ul className="book-list">
        {
            books.map(book => <li key={book.id}>
                <BookPreview book={book} />
                <div className="buttons-list">
                    <button onClick={() => onRemoveBook(book.id)}>Remove book</button>
                    <Link to={`/book/${book.id}`}>Select book</Link>
                </div>
            </li>)
        }
    </ul>
}