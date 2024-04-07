import PropTypes from 'prop-types'
import {Suspense} from "react";

export default function PageComponent({children}) {
    return (
        <main>
            <div className="mx-auto max-w-7xl min-h-[65vh] sm:px-6 lg:px-8">
                <Suspense fallback={<div>Loading from Page Component</div>}>
                    {children}
                </Suspense>
            </div>
        </main>
    )
}
PageComponent.propTypes = {
    children: PropTypes.node
}
