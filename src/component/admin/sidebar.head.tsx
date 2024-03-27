import React from "react";
import { Avatar } from 'primereact/avatar'
import { Checkbox } from 'primereact/checkbox';
import { ContextAdminProps } from "../../context/context.property";
import { PropsValueAdmin } from "../../../types/map.type";

export default function SidebarHead(): React.ReactNode | React.ReactElement {

    const [check, setCheck] = React.useState<boolean>(false);
    const { api } = React.useContext<PropsValueAdmin>(ContextAdminProps);
    const StyledAvatar = {
        color: "#ffff",
        backgroundColor: "var(--main--color)",
        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)"
    }   

    return (
        <React.Fragment>
            <div className="flex justify-content-between p-2" style={{
                height: '75px',
                borderBottom: 'solid 1px var(--surface-400)'}}>
                <div className="flex gap-2" style={{ height: '100%' }}>
                    <Avatar
                        style={StyledAvatar}
                        label="A"
                        color="red"
                        size="normal"
                        className="align-self-center"
                        shape="circle" />
                    <span
                        className="align-self-center text-800 font-bold"
                        style={{ fontSize: '12px' }}>
                        Aldo Ratmawan
                    </span>
                </div>
                <Checkbox
                    className="align-self-center"
                    checked={check}
                    size={10}
                    onChange={() => setCheck(!check)} />
            </div>
        </React.Fragment>
    )
}