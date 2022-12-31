const { useState, useEffect, useRef } = React

import { bookService } from "../services/book.service.js"

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            if (type === 'checkbox') return { ...prevFilter, [field]: checked }
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="full book-filter main-layout">
        <h2>Filter our books</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                id="title"
                name="title"
                placeholder="Type title here"
                value={filterByToEdit.title}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="authors">Author:</label>
            <input type="text"
                id="authors"
                name="authors"
                placeholder="Type author here"
                value={filterByToEdit.authors}
                onChange={handleChange}
            />

            <label htmlFor="maxAmount">Max Price:</label>
            <input type="number"
                id="maxAmount"
                name="maxAmount"
                placeholder="Type maximum price here"
                value={filterByToEdit.maxAmount}
                onChange={handleChange}
            />

            <label htmlFor="isOnSale">On Sale:</label>
            <input type="checkbox"
                id="isOnSale"
                name="isOnSale"
                // value={filterByToEdit.isOnSale}
                onChange={handleChange}
            />

            <button>Filter books!</button>
        </form>

    </section>
}