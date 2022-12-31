const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [isLongTxtShown, setLongTxtShown] = useState(false)

    function toggleTxtShown() {
        setLongTxtShown((prevIsLongTxtShown) => !prevIsLongTxtShown)
    }

    function getShortTxt() {
        return txt.length <= length ? txt : txt.slice(0, length + 1) + '...'
    }

    return <section className="long-txt">

        <p>{isLongTxtShown ? txt : getShortTxt()}
            <a className="shown-txt-link" onClick={toggleTxtShown}>
                {isLongTxtShown ? 'Read Less' : 'Read More'}
            </a>
        </p>
        
    </section>
}