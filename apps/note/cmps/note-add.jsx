const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"


export function NoteAdd({ notes, onAddNotes, onSaveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [selected, isSelected] = useState('text')
    const [file, setFile] = useState();
    const txtRef = useRef(null);
    const videoRef = useRef(null);
    const imgRef = useRef(null);

    function handleChange({ target }) {
        let { value, type, name: field } = target

        if (type === 'text') value = { ...noteToAdd.info, txt: value }
        else if (type === 'url') value = { ...noteToAdd.info, url: value }
        else if (type === 'file') {
            value = { ...noteToAdd.info, img: value }
            console.log('value', value);
            setFile(URL.createObjectURL(target.files[0]));
            noteToAdd.info.img = URL.createObjectURL(target.files[0])
        }
        setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value, type }))
    }

    function setType(ev, type) {
        ev.preventDefault()

        if (type === 'text') isSelected('text')
        if (type === 'video') isSelected('video')
        if (type === 'img') isSelected('img')

    }


    return <section className="note-add">

        {selected === 'text' && <form method="post" encType="multipart/form-data" onSubmit={(ev) => onSaveNote(ev, noteToAdd, file, noteToAdd.url, txtRef)}>
            <label htmlFor="title"></label>
            <input type="text"
                name="info"
                id="title"
                placeholder="Take a note..."
                value={noteToAdd.txt}
                onChange={handleChange}
                ref={txtRef}
            />

            {<button className="btn-txt tooltip" type="button" onClick={(ev) => { setType(ev, 'text') }}> <img src="./assets/img/icons/icons-notes/title_FILL0_wght400_GRAD0_opsz48.svg" alt="Text" /> <span className="tooltiptext">Text</span> </button>}
            {<button className="btn-video tooltip" type="button" onClick={(ev) => { setType(ev, 'video') }}> <img src="./assets/img/icons/icons-notes/play_circle_FILL0_wght500_GRAD0_opsz48.svg" alt="Video" /> <span className="tooltiptext">Video</span></button>}
            {<button className="btn-img tooltip" type="button" onClick={(ev) => { setType(ev, 'img') }}> <img src="./assets/img/icons/icons-notes/asset 11.svg" alt="Image" /><span className="tooltiptext">Image</span> </button>}

        </form>}

        {selected === 'video' && <form method="post" encType="multipart/form-data" onSubmit={(ev) => onSaveNote(ev, noteToAdd, file, noteToAdd.url, videoRef)}>
            <label htmlFor="url"></label>
            <input type="url"
                name="info"
                id="url"
                value={noteToAdd.url}
                onChange={handleChange}
                placeholder="add a youtube video..."
                ref={videoRef}
            />

            {<button className="btn-txt tooltip" type="button" onClick={(ev) => { setType(ev, 'text') }}> <img src="./assets/img/icons/icons-notes/title_FILL0_wght400_GRAD0_opsz48.svg" alt="Text" /> <span className="tooltiptext">Text</span> </button>}
            {<button className="btn-video tooltip" type="button" onClick={(ev) => { setType(ev, 'video') }}> <img src="./assets/img/icons/icons-notes/play_circle_FILL0_wght500_GRAD0_opsz48.svg" alt="Video" /> <span className="tooltiptext">Video</span></button>}
            {<button className="btn-img tooltip" type="button" onClick={(ev) => { setType(ev, 'img') }}> <img src="./assets/img/icons/icons-notes/asset 11.svg" alt="Image" /><span className="tooltiptext">Image</span> </button>}


        </form>}

        {selected === 'img' && <form method="post" encType="multipart/form-data" onSubmit={(ev) => onSaveNote(ev, noteToAdd, file, noteToAdd.url, imgRef)}>
            <label htmlFor="file">choose image</label>
            <input type="file"
                name="info"
                id="file"
                value={noteToAdd.img}
                onChange={handleChange}
                ref={imgRef}

            />
            {<button className="btn-txt tooltip" type="button" onClick={(ev) => { setType(ev, 'text') }}> <img src="./assets/img/icons/icons-notes/title_FILL0_wght400_GRAD0_opsz48.svg" alt="Text" /> <span className="tooltiptext">Text</span> </button>}
            {<button className="btn-video tooltip" type="button" onClick={(ev) => { setType(ev, 'video') }}> <img src="./assets/img/icons/icons-notes/play_circle_FILL0_wght500_GRAD0_opsz48.svg" alt="Video" /> <span className="tooltiptext">Video</span></button>}
            {<button className="btn-img tooltip" type="button" onClick={(ev) => { setType(ev, 'img') }}> <img src="./assets/img/icons/icons-notes/asset 11.svg" alt="Image" /><span className="tooltiptext">Image</span> </button>}
            <button className="btn-add tooltip" title="Add">Add</button>

        </form>}

    </section >
}