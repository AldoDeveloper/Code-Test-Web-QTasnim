import { createBrowserRouter } from 'react-router-dom'
import RootComponent from '../../layout/layout.route'
import PagesIndex from '../pages'
import React from 'react'
import Error from '../error/error'
import SuspenseHandle from '../component/fallback/suspense.handle'
import RootAdmin from '../../layout/layout.admin.root'
import LayoutAuthPages from '../component/auth/layout.auth.component'
import PagesRootIndexAdmin from '../pages'

const ProtectedAuthRoot  = React.lazy(() => DelayComponent(import('../../layout/layout.protected.root'), 2000) as any)
const AuthRootGuest      = React.lazy(() => import('../../layout/layout.auth.root'))

export const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootComponent/>,
            errorElement: <Error/>,
            loader: async() => {
                return{ name: "Aldo Ratmawan" }
            },
            children: [
                {
                    index: true,
                    element: <PagesIndex/>
                },
                {
                    path:'auth',
                    element: (
                        <React.Suspense fallback={<><h4>loading Skelton</h4></>}>
                            <AuthRootGuest/>
                        </React.Suspense>
                    ),
                    children:[
                        {
                            path: ':path',
                            element: <LayoutAuthPages/>
                        },
                    ]
                },
                {
                    path: 'protected',
                    element: (
                        <SuspenseHandle>
                            <ProtectedAuthRoot/>
                        </SuspenseHandle>
                    ),
                    handle:{
                        crumb: {
                            label: "Protected",
                            className: "pl-2 pr-2 text-800",
                            url : "/",
                        }
                    },
                    children: [
                        {
                            index: true,
                            element: <><h1>Index Pages</h1></>,
                        },
                        {
                            path: 'admin',
                            element: <RootAdmin />,
                            errorElement: <><h4>Error Element Data</h4></>,
                            children:[
                                {
                                    index: true,
                                    element: <PagesRootIndexAdmin/>,
                                    handle:{
                                        crumb: {
                                            label: "Dasboard",
                                            className: "pl-2 pr-2 text-200",
                                            url : "/dasboard",
                                        }
                                    }
                                },
                                {
                                    path: '/protected/admin/test',
                                    element: <><h2>Pages Elemet Test</h2></>
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ],
)

export function DelayComponent(element: any, delay?: number) {
    return new Promise((resolve) => {
        if (delay) {
            setTimeout(() => {
                resolve(element)
            }, delay)
        }else{
            resolve(element)
        }
    })
}