const { Outlet, Link } = ReactRouterDOM

export function About() {
    return <div className="about">
    <h1>
        about us
    </h1>
    <div className="nested-route">
        <Outlet />
    </div>
</div>
}
