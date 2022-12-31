const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <h5 className="animate__animated">Welcome to</h5>
        <h1 className="animate__animated">Appsus</h1>
        <h4 className="animate__animated">Your everyday <span>apps</span> kept with <span>us</span></h4>
        <div className="apps-container animate__animated">
            <Link to="/mail">
                <div className="container mail">
                    <img src="./assets/img/icons/icons-mail/icons8-gmail-480.svg" alt="email" />
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, praesentium ducimus incidunt veniam sed deserunt commodi! Ipsum autem impedit totam quod earum incidunt repellendus libero saepe quibusdam tempore? Ab, veritatis?</p> */}
                </div>
            </Link>
            <Link to="/note">
                <div className="container note">
                    <img src="./assets/img/icons/icons-notes/icons8-google-keep-480.svg" alt="note" />
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, praesentium ducimus incidunt veniam sed deserunt commodi! Ipsum autem impedit totam quod earum incidunt repellendus libero saepe quibusdam tempore? Ab, veritatis?</p> */}
                </div>
            </Link>

            <Link to="/book">
                <div className="container book ">
                    <img src="./assets/img/icons/icons-book/icons8-google-books-480.svg" alt="book" />
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, praesentium ducimus incidunt veniam sed deserunt commodi! Ipsum autem impedit totam quod earum incidunt repellendus libero saepe quibusdam tempore? Ab, veritatis?</p> */}
                </div>
            </Link>


        </div>

    </section>
}