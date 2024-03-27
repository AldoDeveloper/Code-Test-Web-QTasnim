import React from "react";
import { BsJustify, BsXCircle } from 'react-icons/bs';
import { ContextAdminProps } from "../../context/context.property";
import { PropsValueAdmin } from "../../../types/map.type";
import { Avatar } from 'primereact/avatar';
import { BsFillMoonStarsFill, BsBrightnessHigh } from 'react-icons/bs';
import SwitchToogle from "../switch.toogle";
import styles from '../../App.module.scss';

export default function NavbarAdmin(): React.ReactElement | React.ReactNode {

    const {
        props,
        callbackVisibleSidebar,
        notifSide,
        setNotifSide,
        propsContextApp,
        setPropsContextApp,
        visibleSidebarMobile,
        setSidebarVisibleMobile
    } = React.useContext<PropsValueAdmin>(ContextAdminProps);

    const responsiveDevice: boolean = propsContextApp?.resizeWindow as number > 1024;
    
    return (
        <React.Fragment>
            <div className="navbar">
                <div className="container">
                    <div className="flex justify-content-between align-items-center">
                        <div className="flex gap-3 align-items-center">
                            {
                                !props?.setting?.visibleSidebar ? (
                                    <BsJustify
                                        size={25}
                                        className="text-700 cursor-pointer"
                                        onClick={
                                            responsiveDevice
                                                ? callbackVisibleSidebar as any
                                                : () => setSidebarVisibleMobile(!visibleSidebarMobile)} />
                                ) : (
                                    <BsXCircle
                                        size={25}
                                        className="text-700 cursor-pointer"
                                        onClick={
                                            responsiveDevice
                                                ? callbackVisibleSidebar as any
                                                : () => setSidebarVisibleMobile(!visibleSidebarMobile)} />
                                )
                            }
                            <SwitchToogle
                                styleScss={styles}
                                checked={notifSide as boolean}
                                onChange={() => setNotifSide(!notifSide)} />
                        </div>
                        <div>
                            <div className="flex gap-4 align-items-center">
                                {
                                    !propsContextApp?.darkMode ? (
                                        <BsFillMoonStarsFill
                                            size={21}
                                            onClick={() => setPropsContextApp({ type: 'setMode' })}
                                            className="text-800 cursor-pointer" />
                                    ) : <BsBrightnessHigh size={21}
                                            onClick={() => setPropsContextApp({ type: 'setMode' })}
                                            className="text-white cursor-pointer" />
                                }

                                <Avatar
                                    className="text-white font-bold bg-green-400"
                                    label="A"
                                    style={{ width: 40, height: 40 }}
                                    shape="circle"
                                    size="normal" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}