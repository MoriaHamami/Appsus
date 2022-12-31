

export function AboutTeam() {
    return <section className="aboutTeam">

        {/* Moria */}
        <section className="each-member">
            <div className="image-container">
                <img className="" src="./assets/img/about-imgs/moria-img.png" alt="" />
            </div>
            <h4>Moria Hamami</h4>
            <p className="">Full Stack Web Developer</p>
            <ul className="social-buttons">
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
            <p className="about-description"><span className=""></span>
                is a Web Developer with an IT background from her experience in the Israel Defense Force.
                In addition, she worked with Malam Team as an IT Help Desk over a duration of eight months.</p>
        </section>
        <section className="each-member">
            <div className="image-container">
                <img className="" src="./assets/img/about-imgs/yael-img.png" alt="" />
            </div>
            <h4>Yael Tal</h4>
            <p className="">Full Stack Web Developer</p>
            <ul className="social-buttons">
                <li className="list-inline-item">
                    <a href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a href="#">
                        <i className="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>
            <p className="about-description"><span className=""></span>
                Currently a student in CA as a Web Developer.</p>
        </section>

    </section>
}