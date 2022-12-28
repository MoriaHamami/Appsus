
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteFilter({ onSetFilter }){

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        // value = (type === 'number') ? +value : value
        // if (type === 'text') value = { ...filterByToEdit.info, txt: value }
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit);
    }

    function onSearchClick(){
        console.log('you clicked search');
        //here i need to put by types
    }

    return <section className="note-filter">

        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">Title: </label>

            <input type="text"
                id="title"
                name="txt"
                placeholder="By title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                onClick={onSearchClick}
            />
        </form>
    </section>
}