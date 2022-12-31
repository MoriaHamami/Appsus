const { useState } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"
import { StarRating } from "./star-rating.jsx"

export function AddReview({ book, onSaveReview }) {
    const [isAddReviewShown, setIsAddReviewShown] = useState(false)
    // const [bookReview, setBookReview] = useState(bookService.getEmptyBook())
    // const navigate = useNavigate()
    // const { bookId } = useParams()

    // useEffect(() => {
    //     if (!bookId) return
    //     loadBook()
    // }, [])

    // function loadBook() {
    //     bookService.get(bookId)
    //         .then((book) => setBookReview(book))
    //         .catch((err) => {
    //             console.log('Had issues in book details', err)
    //             navigate('/book')
    //         })
    // }

    // function handleChange({ target }) {
    //     let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     setBookReview((prevReview) => ({ ...prevReview, [field]: value }))
    // }

    // function onSaveReview(ev) {
    //     ev.preventDefault()
    //     bookService.save(bookReview).then((book) => {
    //         console.log('book saved', book);
    //         bookReview.id ? showSuccessMsg('Book saved!') : showSuccessMsg('Book added!')
    //         navigate('/book')
    //     })
    // }

    function onSubmitReview(ev) {
        ev.preventDefault()
        const { target } = ev
        const name = target.fullName.value
        const rating = getStarRating()
        // const rating = +target.rating.name
        console.log('target.fullName:', ev)        // const rating = target.rating.value
        const date = target.readAt.value
        const bookReview = { name: name, rating:rating, date: date }
        // const bookReview = { name: name, rating: rating, date: date }
        book.reviews ? book.reviews.push(bookReview) : book.reviews = [bookReview]
        
        console.log('book.reviews:', book.reviews)
            
            setIsAddReviewShown(false)
        onSaveReview(book)
    }

    function getStarRating() {
        const elStars = document.querySelector('input[name="star"]:checked')
        return elStars ? +elStars.value : 0
    }

    // <button onClick={onAddReview}>Add Review</button>
    // {isAddReviewShown && <AddReview />}
    // if (!isAddReviewShown) return <span></span>
    return <section className="book-edit">
        {!isAddReviewShown && <button onClick={() => setIsAddReviewShown(true)}>Add Review</button>}

        {isAddReviewShown &&
            <form onSubmit={onSubmitReview}>
                <div>
                    <label htmlFor="fullName">Full Name : </label>
                    <input type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter full name..."
                    // value={bookReview.title}
                    // onChange={handleChange}
                    />
                </div>
                {/* <label htmlFor="rating">Rating : </label> */}
                {/* <input type="text"
                    name="rating"
                    id="rating"
                    placeholder="Enter book rating..."
                    // value={bookReview.rating}
                    // onChange={handleChange}
                /> */}

                <StarRating getStarRating={getStarRating}></StarRating>

                <div>
                    <label htmlFor="readAt">readAt : </label>
                    <input type="date"
                        name="readAt"
                        id="readAt"
                    />
                </div>

                <div>
                    <button>Add Review</button>
                    <button type="button" onClick={() => setIsAddReviewShown(false)}>Cancel</button>
                </div>
            </form>
        }
    </section>
}
