
const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit);
    }

    function onSearchClick() {
        console.log('you clicked search');
        //here i need to put by types
    }

    return <section className="note-filter">

        <form className="nosubmit" onSubmit={onSubmitFilter}>

            <input type="text"
                id="title"
                name="txt"
                placeholder="Search"
                value={filterByToEdit.txt}
                onChange={handleChange}
                onClick={onSearchClick}

            />
        </form>
    </section>
}