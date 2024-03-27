import {useNavigate, Outlet } from "react-router-dom";
import React from "react";
import { useAtom } from "jotai";
import { DeriviedRootUser } from "../src/state/state.context.route";
import { Helmet } from 'react-helmet';
import { useCookies } from 'react-cookie';

export const ContextRootApp = React.createContext<any>({})

interface UserAuth{
    id?: string,
    name ?: string,
    email ?: string
    email_verified_at ?: string,
    iat ?: number,
    exp ?: number,
    auth?: boolean
}

export default function RootComponent() {

    const [auth, callback] = useAtom(DeriviedRootUser);
    const [cookie] = useCookies();
    const Navigate = useNavigate();
    const [authData, setAuth] = React.useState<boolean>(false);
    const [userAuth, setUserAuth] = React.useState<UserAuth>();

    const value = {
        auth,
        callback,
        JWT_TOKEN: cookie?.AUTH_TOKEN,
        userAuth
    }

    React.useEffect(() => {

        if(userAuth) return Navigate("/protected/admin");
        if (cookie?.AUTH_TOKEN) {
            const url = "http://localhost:4500/v1/product/user";
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${cookie?.AUTH_TOKEN}`
                }
            }).then(async (res) => {
                if(res.status === 200 && res.ok){ 
                    const body = await res.json();
                    setAuth(!authData);
                    setUserAuth((props) => {
                        return {
                            ...body,
                            auth: true
                        }
                    });
                }
            })
        }
    }, [cookie, userAuth])

    return (
        <React.Fragment>
            <Helmet>
                <title>ALD DASBOARD</title>
            </Helmet>
            <ContextRootApp.Provider value={value}>
                <Outlet/>
            </ContextRootApp.Provider>
        </React.Fragment>
    )
}