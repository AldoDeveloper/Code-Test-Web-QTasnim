import { MenuItem } from "primereact/menuitem";
import React from "react";
import { PropsTypeSidebarAdmin } from "../../../types/map.type";
import { SubMenuListSidebar } from "./sidebar.submenu";

export function AppMenuSidebar({ menu, index }: PropsTypeSidebarAdmin) {
    return (
        <React.Fragment>
            <ul key={index}>
                <li>
                    <p className="labels text-600 font-semibold">{menu?.label}</p>
                    {
                        menu?.items && (
                            <ul>
                                {
                                    menu?.items.map((menu: MenuItem, index: number) => (
                                        <SubMenuListSidebar
                                            key={index}
                                            menu={menu}
                                            index={index} />
                                    ))
                                }
                            </ul>
                        )
                    }
                </li>
            </ul>
        </React.Fragment>
    )
}   