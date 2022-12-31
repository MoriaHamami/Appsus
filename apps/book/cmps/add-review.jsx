const { useState } = React

import { StarRating } from "./star-rating.jsx"

export function AddReview({ book, onSaveReview }) {

    const [isAddReviewShown, setIsAddReviewShown] = useState(false)

    function onSubmitReview(ev) {
        ev.preventDefault()
        const { target } = ev
        const name = target.fullName.value
        const rating = getStarRating()
        const date = target.readAt.value
        const bookReview = { name: name, rating: rating, date: date }
        book.reviews ? book.reviews.push(bookReview) : book.reviews = [bookReview]
        setIsAddReviewShown(false)
        onSaveReview(book)
    }

    function getStarRating() {
        const elStars = document.querySelector('input[name="star"]:checked')
        return elStars ? +elStars.value : 0
    }

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
                    />
                </div>
    
                <StarRating getStarRating={getStarRating}></StarRating>

                <div>
                    <label htmlFor="readAt">readAt: </label>
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
