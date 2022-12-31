export function StarRating({getStarRating}) {

    return <section className="star-rating" onChange={getStarRating}>
    <input id="star-5" type="radio" name="star" value="5"/>
    <label htmlFor="star-5"></label>
    <input id="star-4" type="radio" name="star" value="4"/>
    <label htmlFor="star-4"></label>
    <input id="star-3" type="radio" name="star" value="3"/>
    <label htmlFor="star-3"></label>
    <input id="star-2" type="radio" name="star" value="2"/>
    <label htmlFor="star-2"></label>
    <input id="star-1" type="radio" name="star" value="1"/>
    <label htmlFor="star-1"></label>
    </section>

}