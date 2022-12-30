import { noteService } from "../services/note.service.js"
import { NoteTxt } from "./note-txt.jsx"


const { useState, useEffect } = React

export function SurveyApp() {
    const [survey, setSurvey] = useState(null)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        noteService.getById()
            .then(setSurvey)
    }, [])



    function onChangeVal(id, val) {
        const answersToSave = { ...answersMap }
        answersToSave[id] = val
        setAnswersMap(answersToSave)
    }


    if (!survey) return '<div></div>'

    const style = {
        backgroundColor: 'lightcoral',
        padding: '5px', margin: '5px'
    }
    return (
        <section className="survey-app">
            <h2>Survey - {survey.title}</h2>
            {
                survey.cmps.map((cmp, idx) => <div key={cmp.id} style={style}>
                    <DynamicCmp
                        type={cmp.type} info={cmp.info} val={answersMap[cmp.id] || ''}
                        onChangeVal={(val) => {
                            onChangeVal(cmp.id, val)
                        }}
                    />
                </div>)
            }
            <hr />
            <pre>
                {JSON.stringify(answersMap, null, 2)}
            </pre>
        </section >
    )
}


function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteTxtText {...props} />
        // case 'note-img':
        //     return <SelectBox {...props} />
        // case 'note-video':
        //     return <TextArea {...props} />
        // case 'note-todos':
        //     return <TextArea {...props} />
    }
}

function NoteTxtText({ info, val = '', onChangeVal }) {

    const { title, txt } = info
    return (
        <label>
            {title}
            {txt}
            <input type="text" value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </label>
    )

    return <section className="note-txt">
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
        {/* return <div contentEditable onBlur={onSaveChange(note)}></div> */}
    </section>
}


function TextBox({ info, val = '', onChangeVal }) {
    const { title } = info
    return (
        <label>
            {title}
            <input type="text" value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </label>
    )

}

function SelectBox({ info, val = '', onChangeVal }) {
    const { label, opts } = info
    return (
        <label>
            {label}
            <select value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }}>
                <option value="">Select an option</option>
                {
                    opts.map(opt => <option key={opt}>{opt}</option>)
                }
            </select>
        </label>
    )
}

function TextArea({ info, val = '', onChangeVal }) {
    const { title } = info
    return (
        <label>
            {title}
            <textarea value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </label>
    )

}

