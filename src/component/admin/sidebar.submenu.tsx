import React from "react";
import { PropsTypeSidebarAdmin } from "../../../types/map.type";
import { NavLink } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { AnimatePresence, motion } from 'framer-motion'
import { TransitionAnimate } from "../../animation/props.animation";
import { MenuItem } from "primereact/menuitem";

export function SubMenuListSidebar(props: PropsTypeSidebarAdmin): React.ReactElement | React.ReactNode {
    
    const [visible, setVisible] = React.useState<boolean>(false);
    return (
        <React.Fragment>
            <li>
                <NavLink
                    className={`link-color ${visible && "actived-visible-link"}`}
                    onClick={props.menu?.items && (() => setVisible(!visible))}
                    to={props.menu?.url ? props.menu.url : '#'}>
                    <span className="flex justify-content-between">
                        <span>
                            {
                                typeof (props?.menu?.icon) === 'string' ? <i className={"icon " + props?.menu.icon}></i> : props?.menu?.icon
                            }
                            <span>{props?.menu?.label}</span>
                        </span>
                        {
                            props?.menu!.items && (
                                <BsChevronRight
                                    className={`align-self-center font-bold transition-duration-200 ${visible ? 'rotate-90' : ''}`}
                                    size={14} />
                            )
                        }
                    </span>
                </NavLink>
            </li>
            <AnimatePresence key={props.index}>
                <motion.div
                    id={String(props.index)}
                    key={Math.random() * 10 / 2}
                    transition={{ duration: 0.3 }}
                    initial="hidde"
                    animate="show"
                    exit={"exite"}
                    variants={TransitionAnimate}>
                    {
                        visible && (
                            <ul className="submenu">
                                {
                                    props?.menu?.items?.map((menu: MenuItem, idx) => (
                                        <li key={idx}>
                                            <NavLink
                                                className={({ isActive }) => `link-color`}
                                                to={menu?.url as string}>
                                                <span className="flex justify-content-between">
                                                    <span>
                                                        {
                                                            typeof (props?.menu?.icon) === 'string' ? <i className={"icon " + menu.icon}></i> : menu?.icon
                                                        }
                                                        <span>{menu.label}</span>
                                                    </span>
                                                </span>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </motion.div>
            </AnimatePresence>
        </React.Fragment>
    )
}