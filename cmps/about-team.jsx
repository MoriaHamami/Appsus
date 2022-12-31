

export function AboutTeam() {
    return <section className="aboutTeam">

        {/* Moria */}
        <section className="bg-light py-3" id="me">
            <img className="mx-auto rounded-circle" src="./assets/img/about-imgs/moria-img.png" alt="" />
            <h4>Moria Hamami</h4>
            <p className="text-muted">Full Stack Web Developer</p>
            <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                    <a href="https://www.instagram.com/moriahamami/">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="https://www.facebook.com/moria.hamami.9/">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="https://www.linkedin.com/in/moriahamami/">
                        <i className="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>
            <p className="large text-muted  about-description"><span className="font-weight-bold">Moria Hamami</span>
                is a Web Developer with an IT background from her experience in the Israel Defense Force.
                In addition, she worked with Malam Team as an IT Help Desk over a duration of eight months.
                In this gallery, you can get a chance to explore the different projects Moria created as a Full Stack Web Developer.</p>
        </section>

    </section>
}