import React from "react";
import { MenuSidebar } from '../src/component/admin/props.admin'
import { AppMenuSidebar } from '../src/component/admin/sidebar.menu';
import { MenuItem } from "primereact/menuitem";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionSidebarVisible } from "../src/animation/props.animation";
import SidebarHead from "../src/component/admin/sidebar.head"
import { ContextAdminProps } from "../src/context/context.property";
import SidebarNotif from "../src/component/admin/sidebar.notif";
import { PropsValueAdmin } from "../types/map.type";

export default function SidebarAdmin({ toogle }: { toogle?: boolean }): React.ReactNode | React.ReactElement {

    const { notifSide } = React.useContext<PropsValueAdmin>(ContextAdminProps);

    return (
        <React.Fragment>
            <AnimatePresence>
                <motion.ul
                    initial={"hidde"}
                    transition={{ duration: 0.2 }}
                    animate={!toogle ? "show" : "hidde"}
                    exit={"exite"}
                    variants={TransitionSidebarVisible}>
                    <SidebarHead />
                    {
                        !notifSide ?
                            <menu className="p-2">
                                {
                                    MenuSidebar.map((menu: MenuItem, index: number) => (
                                        <AppMenuSidebar
                                            key={menu?.label + String(index)}
                                            menu={menu}
                                            index={index} />
                                    ))
                                }
                            </menu> : (
                                <menu className="p-2 fade-in-bottom-right">
                                    <SidebarNotif />
                                </menu>
                            )
                    }
                </motion.ul>
            </AnimatePresence>
        </React.Fragment>
    )
}