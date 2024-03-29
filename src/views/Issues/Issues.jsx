import {lazy} from "react";

const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));

export default function Problems() {
    return (
        <PageComponent title="Find and solve people problems online while learning">
            
        </PageComponent>
    )
}
