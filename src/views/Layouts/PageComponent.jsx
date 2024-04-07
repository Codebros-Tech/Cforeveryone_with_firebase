import PropTypes from 'prop-types'

export default function PageComponent({children}) {
    return (
        <main>
            <div className="mx-auto max-w-7xl min-h-[65vh] sm:px-6 lg:px-8">
                {children}
            </div>
        </main>
    )
}
PageComponent.propTypes = {
    children: PropTypes.node
}
