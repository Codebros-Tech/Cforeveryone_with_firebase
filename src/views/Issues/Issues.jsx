import {lazy} from "react";

const PageComponent = lazy(() => import("../../components/PageComponent"));

export default function Problems() {
    return (
        <PageComponent title="Find and solve people problems online while learning">
            
        </PageComponent>
    )
}
