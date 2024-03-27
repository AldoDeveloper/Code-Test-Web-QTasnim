import React from "react";
import { MenuSidebarNotif } from "./props.admin";
import { Badge } from 'primereact/badge';

export default function SidebarNotif(): React.ReactNode | React.ReactElement {
    return (
        <React.Fragment>
            {
                MenuSidebarNotif.map((menu, index) => (
                    <ul key={index}>
                        <li>
                            <div className="flex justify-content-between">
                                <span className="labels text-700 font-semibold">{menu.label?.toLocaleUpperCase()}</span>
                                {
                                    menu?.notif && (
                                        <Badge
                                            className="align-self-center"
                                            value={"5"}
                                            severity={"danger"} />
                                    )
                                }
                            </div>
                            {menu?.template as any}
                        </li>
                    </ul>
                ))
            }
        </React.Fragment>
    )
}