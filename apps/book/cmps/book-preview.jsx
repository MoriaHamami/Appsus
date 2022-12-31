import { utilService } from "../../../services/util.service.js"
// function getCurrencySymbol({ locale = 'he-IL', currencyCode }) {
//     return (0).toLocaleString(
//         locale,
//         {
//             style: 'currency',
//             currency: currencyCode,
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }
//     ).replace(/\d/g, '').trim()
// }

export function BookPreview({ book}) {

    function getPriceColor(book) {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return 'black'
    }

    return <article className="book-preview">
        <img src={book.thumbnail} />
        <h2>{book.title}</h2>
        {/* <p>{book.subtitle}</p> */}
        {/* <p>Author: {book.authors.join(', ')}</p> */}
        {book.categories && <p>Categories: {book.categories.join(', ')}</p>}
        {book.language && <p>Language: {book.language}</p>}
        {book.listPrice.isOnSale && <h4>ON SALE</h4>}
        {book.listPrice.amount && <h4 style={{ color: getPriceColor(book) }}>Price: {utilService.getAmount(book.listPrice.amount, book.listPrice.currencyCode)}</h4>}
    </article>
}