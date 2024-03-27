import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React from "react";
import { BsEnvelope } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

export default function RegisterAuthComponent() : React.ReactNode | React.ReactElement {
    return(
        <React.Fragment>
            <Card
                title={<h4 className="text-400 pt-3 pr-3 pl-3">Register Akun</h4>}
                className="box-shadow-card"
                style={{
                    width: "400px",
                    background: "white"
                }}>
                <div className="grid p-3">
                    <div className="col-12">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon border-input-left">
                                <BsEnvelope />
                            </span>
                            <InputText className="w-full p-inputtext-lg border-input-right" />
                        </div>
                    </div>
                    <div className="col-12 mt-1">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon border-input-left">
                                <BsEnvelope />
                            </span>
                            <InputText className="w-full p-inputtext-lg border-input-right" />
                        </div>
                    </div>
                    <div className="col-12 mt-1">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon border-input-left">
                                <BsEnvelope />
                            </span>
                            <InputText type="password" className="w-full p-inputtext-lg border-input-right" />
                        </div>
                        <a href="#" className="text-sm mt-2" style={{
                            float: "right"
                        }}>Forgot Password</a>
                    </div>
                    <div className="col-12 w-full">
                        <Button
                            rounded
                            label="Submit"
                            className="w-full mb-3"
                            size="large"
                            severity="info" />
                        <p className="text-center text-sm">Sudah Punya Akun? <NavLink to={"/auth/login"}>Login</NavLink></p>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}