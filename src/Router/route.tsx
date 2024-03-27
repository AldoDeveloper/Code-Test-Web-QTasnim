import { RouterProvider } from 'react-router-dom'
import React from 'react'
import { routes } from './router.register'

const LoadingFallbackLazy = React.lazy(() => import('../component/loading.component'))

export default function RouteApp() {
    return (
        <RouterProvider 
            router={routes}
            fallbackElement={<LoadingFallbackLazy/>} />
    )
}
