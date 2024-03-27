import React from "react";
import NavbarAdmin from "../src/component/admin/navbar.admin";
import { useAtom } from "jotai";
import { DeriviedApiProduct, DeriviedSettingComponentAdmin } from "../src/state/state.context.route";
import SidebarAdmin from '../layout/layout.sidebar.admin';
import { ContextAdminProps, ContextApp } from "../src/context/context.property";
import { OptionsContextApp, PropsValueAdmin } from "../types/map.type";
import { Outlet } from "react-router-dom";
import BreadCrumbs from "../src/component/admin/bread.crumb";
import { Sidebar } from 'primereact/sidebar'
import { useScroll, motion } from "framer-motion";
import FooterAdmin from "../src/component/admin/footer.admin";
import { useCookies } from "react-cookie";

export default function RootAdmin() : React.ReactNode | React.ReactElement {
    const refContentScrool  = React.useRef<any>(null);
    const [props, setProps] = useAtom(DeriviedSettingComponentAdmin);
    const [notifSide, setNotifSide] = React.useState<boolean>(false);
    const propsContextApp   = React.useContext<OptionsContextApp>(ContextApp);
    const [visibleSidebarMobile, setSidebarVisibleMobile] = React.useState<boolean>(false);
    const [propsApiProduct, setOptionApiProduct] = useAtom(DeriviedApiProduct);
    const [cookie] = useCookies();

    React.useEffect(() => {
        setOptionApiProduct({
            type: "all",
            query : {
                token: cookie!.AUTH_TOKEN
            }
        });

        setOptionApiProduct({
            type: 'get-category',
            query:{
                token: cookie!.AUTH_TOKEN
            }
        })
    },[]);

    const styledObjectSidebar = {
        '--width-sidebar':
             !props.setting?.visibleSidebar
             ? props.setting?.["--width-sidebar"] 
             : '0'
    }

    const { scrollY } = useScroll({
        target: refContentScrool,
    });

    const handleClickNavbar = async () => {
        setProps({
            type: 'set',
            setting: {
                ...props.setting,
                visibleSidebar: !props.setting?.visibleSidebar
            }
        })
    }

    const values: PropsValueAdmin = {
        props,
        setProps,
        notifSide,
        setNotifSide,
        callbackVisibleSidebar: handleClickNavbar,
        propsContextApp    : propsContextApp.props,
        setPropsContextApp : propsContextApp.setProps,
        visibleSidebarMobile,
        setSidebarVisibleMobile,
        api : {
            propsApiProduct,
            action: setOptionApiProduct
        }
    }

    return (
        <React.Fragment>
            <Sidebar
                visible={visibleSidebarMobile}
                className={propsContextApp?.props?.darkMode ? "bg-mode-dark" : "bg-mode-light"}
                onHide={() => setSidebarVisibleMobile(false)}>
                <h2>Lorem Ipsum</h2>
            </Sidebar>
            <ContextAdminProps.Provider value={values}>
                <main className="wraper-layout" style={{ ...styledObjectSidebar as any }}>
                    <div className="sidebar disabled-scrool" style={
                        props.setting?.visibleSidebar ? { borderRight: 'none' } : {}}>
                        <SidebarAdmin toogle={props.setting?.visibleSidebar} />
                    </div>
                    <div className="main">
                        <nav>
                            <NavbarAdmin/>
                        </nav>
                        <motion.div
                            ref={refContentScrool}
                            className="content">
                            <div className="container">
                                <BreadCrumbs/>
                                <p className="text-500 font-bold mt-4 text-2xl">Dasboard Admin</p>
                                <Outlet/>
                            </div> 
                        </motion.div>
                        <FooterAdmin />
                    </div>
                </main>
            </ContextAdminProps.Provider>
        </React.Fragment>
    )
}