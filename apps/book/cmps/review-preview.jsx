export function ReviewPreview({ review, onRemoveReview, idx, book }) {
    return <div>
        <div>Full Name: {review.name}</div>
        <div>Rating: <span>{'⭐'.repeat(review.rating)}</span></div>
        <div>Read at: {review.date}</div>
        <button onClick={() => onRemoveReview(book, idx)}>Delete review</button>
    </div>
}