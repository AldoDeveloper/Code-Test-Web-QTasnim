import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error)
    return(
        <React.Fragment>
            <h1 className="text-center">Error 404</h1>
        </React.Fragment>
    )
}