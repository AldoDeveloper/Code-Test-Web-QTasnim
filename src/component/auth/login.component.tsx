import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React from "react";
import { BsEnvelope, BsKey } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import { ContextRootApp } from "../../../layout/layout.route";

export default function LoginAuthComponent(): React.ReactNode | React.ReactElement {

    const { callback }  = React.useContext(ContextRootApp);

    const onHandleSubmit =async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());
        callback({
            type: "login",
            bodyLogin: body
        })
    }

    return (
        <React.Fragment>
            <Card
                title={<h4 className="text-400 text-center pt-3 pr-3 pl-3">Login Qtasnim Code Test</h4>}
                className="box-shadow-card"
                style={{
                    width: "400px",
                    background: "white"
                }}>
                <div className="grid p-3">
                    <form onSubmit={onHandleSubmit} className="w-full">
                        <div className="col-12">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon border-input-left">
                                    <BsEnvelope />
                                </span>
                                <InputText placeholder="Masukan Email" name="email" className="text-lg text-500 w-full p-inputtext-lg border-input-right" />
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon border-input-left">
                                    <BsKey size={18} />
                                </span>
                                <InputText placeholder="Masukan Password" type="password" name="password" className="text-lg text-500 w-full p-inputtext-lg border-input-right" />
                            </div>
                            <a href="#" className="text-sm mt-2" style={{
                                float: "right"
                            }}>Forgot Password</a>
                        </div>
                        <div className="col-12 w-full">
                            <Button
                                type="submit"
                                rounded
                                label="Submit"
                                className="w-full mb-3 mt-3"
                                size="large"
                                severity="info" />
                            <p className="text-center text-sm">Baru di Qtasnim? <NavLink to={"/auth/register"}>Daftar</NavLink></p>
                        </div>
                    </form>
                </div>
            </Card>
        </React.Fragment>
    )
}