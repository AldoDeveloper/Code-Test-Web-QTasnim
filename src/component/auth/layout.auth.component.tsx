import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginAuthComponent from "./login.component";
import RegisterAuthComponent from "./register.component";
import { useCookies } from 'react-cookie';
import { Avatar } from "primereact/avatar";
import { ContextRootApp } from "../../../layout/layout.route";

export const RegisterPath = ['login', 'register'];

const DateExpiredCookies = new Date();
DateExpiredCookies.setFullYear(DateExpiredCookies.getFullYear() + 1);

export default function LayoutAuthPages() {

    const { path }  = useParams();
    const Navigate  = useNavigate();
    const hashRoute = RegisterPath.some((value) => path === value);
    const [__, setCookie]  = useCookies();
    const { auth , userAuth}         = React.useContext(ContextRootApp);
    const { resSuccess }   =  auth;

    React.useEffect(() => {
        if(userAuth) return Navigate("/protected/admin")
        if (!hashRoute) return Navigate('/error');
        if(resSuccess?.access_token){
            setCookie('AUTH_TOKEN', resSuccess!.access_token, {
                path: '/',
                maxAge: DateExpiredCookies.getTime(),
            })
        }
    }, [resSuccess]);

    return (
        <React.Fragment>
            <nav className="navbar-auth">
                <div className="content w-full">
                    <div className="flex justify-content-between align-items-center">
                        <h3 className="text-800">Test Code Web</h3>
                        <div>
                            <Avatar
                                style={{
                                    width: '40px',
                                    height: '40px'
                                }}
                                label="A" size="normal" shape="circle" />
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="grid justify-content-center align-items-center">
                    <div className="col-12 md:col-6">
                        <div className="warpper-image-bg w-full">
                            <img src="/auth.png" width={500} />
                        </div>
                    </div>
                    <div className="col-12 md:col-5">
                        {
                            hashRoute && path === 'login' ? <LoginAuthComponent /> : <RegisterAuthComponent />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}