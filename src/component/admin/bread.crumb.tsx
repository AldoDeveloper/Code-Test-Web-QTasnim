import React, { useRef } from "react";
import { BreadCrumb } from 'primereact/breadcrumb';
import { BsFillHouseFill } from 'react-icons/bs'
import { MenuItem } from "primereact/menuitem";
import { useMatches } from "react-router-dom";

export default function BreadCrumbs(): React.ReactNode | React.ReactElement {

    const routesMatches = useMatches();
    const Home : MenuItem = {   
        className: "pr-2", 
        icon: () => <BsFillHouseFill size={20} 
        color="var(--main--color)" />, 
        url: 'https://primereact.org' 
    };

    const crumbListObject: Array<MenuItem> = 
        routesMatches
            .filter((props : any) => Boolean(props.handle?.crumb)) 
            .map((math : any)     => math.handle?.crumb as MenuItem);
        
    return (
        <React.Fragment>
            <BreadCrumb
                className="bread-crumbs"
                model={crumbListObject}
                home={Home}
                unstyled={false} />
        </React.Fragment>
    )
}