import React from "react"
import LoadingAnimate from "../loading.component"

type PropsSuspense = {
    children?: React.ReactNode | React.ReactElement,
    loadingElement?: React.ReactNode | React.ReactElement
}

export default function SuspenseHandle(props: PropsSuspense) {
    return (
        <React.Fragment>
            <React.Suspense
                fallback={props.loadingElement ? props.loadingElement : <LoadingAnimate />}>
                {props?.children}
            </React.Suspense>
        </React.Fragment>
    )
}