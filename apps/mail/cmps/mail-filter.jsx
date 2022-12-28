const { useEffect, useState, useRef } = React

export function MailFilter({onSetCriteria}) {

    // const [filterByToEdit, setFilterByToEdit] = useState(carService.getDefaultFilter())
    // const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    // useEffect(() => {
    //     // update father cmp that filters change very type
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    //     onSetFilter(filterByToEdit)
    // }


    return <section className="mail-filter">
        <input type="text"
            id="search-mail"
            name="search"
            placeholder="Search"
            // value={filterByToEdit.txt}
            onChange={(ev) => onSetCriteria('txt', ev.target.value)}
            // ref={elInputRef}
        />
    </section>

}

// const [filterByToEdit, setFilterByToEdit] = useState(carService.getDefaultFilter())
//     const elInputRef = useRef(null)

//     useEffect(() => {
//         elInputRef.current.focus()
//     }, [])

//     useEffect(() => {
//         // update father cmp that filters change very type
//         onSetFilter(filterByToEdit)
//     }, [filterByToEdit])

//     function handleChange({ target }) {
//         let { value, name: field, type } = target
//         value = (type === 'number') ? +value : value
//         setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
//     }

//     function onSubmitFilter(ev) {
//         // update father cmp that filters change on submit
//         ev.preventDefault()
//         onSetFilter(filterByToEdit)
//     }

//     // WE WILL NEVER REPEAT OURSELVES
//     // function handleVendorChange(ev) {
//     //     console.log('ev', ev.target.name);
//     //     const { value } = ev.target
//     //     setFilterByToEdit((prevFilter) => {
//     //         return { ...prevFilter, txt: value }
//     //     })
//     //     // filterByToEdit.txt = value
//     //     // setFilterByToEdit(filterByToEdit)
//     // }

//     // function handleMinSpeedChange(ev) {
//     //     console.log('ev', ev.target.name);
//     //     const { value } = ev.target
//     //     setFilterByToEdit((prevFilter) => {
//     //         return { ...prevFilter, minSpeed: value }
//     //     })
//     // }
//     // console.log('elInputRef', elInputRef);
//     return <section className="car-filter full main-layout">
//         <h2>Filter our cars</h2>
//         <form onSubmit={onSubmitFilter}>
//             <label htmlFor="vendor">Vendor:</label>
//             <input type="text"
//                 id="vendor"
//                 name="txt"
//                 placeholder="By vendor"
//                 value={filterByToEdit.txt}
//                 onChange={handleChange}
//                 ref={elInputRef}
//             />

//             <label htmlFor="minSpeed">Min speed:</label>
//             <input type="number"
//                 id="minSpeed"
//                 name="minSpeed"
//                 placeholder="By min speed"
//                 value={filterByToEdit.minSpeed}
//                 onChange={handleChange}
//             />

//             <button>Filter cars!</button>
//         </form>

//     </section>