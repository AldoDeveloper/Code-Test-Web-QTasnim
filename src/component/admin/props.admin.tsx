import { MenuItem } from "primereact/menuitem";
import React from "react";
import { BsShieldFill, BsStack, BsHouseCheck, BsBarChart, BsHouse, BsHouseDown } from 'react-icons/bs'
import SidebarTemplateNotif from "./notif.side";

export const MenuSidebar: Array<MenuItem> = [
    {
        label: "Home",
        icon: "pi pi-home",
        items: [
            {
                label: "Dasboard",
                icon: <BsHouse className="icon" />,
                url: "/protected/admin"
            },
        ],
    },
    {
        label: "Component",
        items: [
            {
                label: "Home 1",
                icon: <BsShieldFill className="icon" />,
                items: [
                    {
                        label: "Sub home 1",
                        icon: <BsBarChart className="icon" />,
                        url: "/hello",
                    },
                    {
                        label: "Sub Home 2",
                        icon: <BsStack className="icon" />,
                        url: "/"
                    },
                ]
            },
            {
                label: "Home 2",
                icon: <BsShieldFill className="icon" />,
                url: '/nasjcs',
                template: (
                    <React.Fragment>

                    </React.Fragment>
                )
            },
            {
                label: "Home 3",
                icon: <BsShieldFill className="icon" />,
                url: '/nasjcs'
            },
            {
                label: "Home 4",
                icon: <BsShieldFill className="icon" />,
                url: '/nasjcs'
            }
        ]
    },
]

export const MenuSidebarNotif: Array<MenuItem & { notif?: boolean }> = [
    {
        id: '1',
        label: "Message",
        notif: true,
        template : <SidebarTemplateNotif/>,
    },
    {
        id: '2',
        label: "Team",
    }
]