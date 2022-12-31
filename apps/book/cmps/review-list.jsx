import { ReviewPreview } from "./review-preview.jsx";

export function ReviewList({ book, onRemoveReview }) {

    return <section className="review-list">
        {book.reviews &&
            book.reviews.map((review, idx) => 
            <ReviewPreview idx={idx} book={book} review={review} onRemoveReview={onRemoveReview} />)}
        {!book.reviews && <div>No Reviews</div>}
        
    </section>
}