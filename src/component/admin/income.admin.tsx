import { Card } from "primereact/card";
import React from "react";
import { ContextApp } from "../../context/context.property";
import { Tag } from "primereact/tag";
import { BsMessenger } from "react-icons/bs";
import { Concreate, OptionsContextApp } from "../../../types/map.type";
import { FaSignal, FaShopify, FaHouseUser } from 'react-icons/fa'
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ListIncome = [
    {
        label: "Per Year",
        colorText: 'rgba(80, 150, 250, 0.9)',
        icon: <FaSignal size={25} color="rgba(80, 150, 250, 0.9)" />,
        value: "50+",
        type: "Order"
    },
    {
        label: "Per Mount",
        colorText: 'rgba(255, 170, 0, 0.7)',
        icon: <FaShopify size={25} color="rgba(255, 170, 0, 0.7)" />,
        value: "19+",
        type: "Project"
    },
    {
        label: "Per Week",
        colorText : 'rgba(10, 200, 120, 0.7)',
        icon: <FaHouseUser size={25} color="rgba(10, 200, 120, 0.7)" />,
        value: "50+",
        type: "Order"
    },
    {
        label: "Per Day",
        colorText: 'rgba(80, 150, 250, 0.9)',
        icon: <FaSignal size={25} color="rgba(80, 150, 250, 0.9)" />,
        value: "100+",
        type: "Projects"
    }
]
export const IncomeComponent = () : React.ReactNode | React.ReactElement => {

    const { scss, props: { darkMode } } = React.useContext<Concreate<OptionsContextApp>>(ContextApp as any);
    const TitleCard = (): React.ReactNode => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h6 className="text-600 text-lg">Income</h6>
            </div>
        )
    }

    const IconRightCard = (
        <div className="absolute top-0 right-0">
            <Tag
                rounded
                className={scss['a-bg-main-500']}
                icon={(__) => <BsMessenger size={12} color="white" />} />
        </div>
    )

    const handleToast = async() => {
        toast.warning("Hello world",{
            position: 'top-right',
            autoClose: 2000,
            pauseOnHover : true
        })
    }
    return (
        <React.Fragment>
            <Card title={TitleCard} className="relative box-shadow-card">
                <div className="flex w-full align-items-center justify-content-center flex-wrap">
                    {
                        ListIncome.map((income, idx) => (
                            <motion.div 
                                whileHover={{
                                    scale: 1.1,
                                }}
                                onClick={handleToast}
                                onHoverStart={() => console.log("Hover start")}
                                className="card-dash w-full mb-3 cursor-pointer" 
                                style={darkMode && {
                                    background: 'var(--surface-100)'
                                } as any}
                                key={idx}>
                                <div className="card-dash-header">
                                    <span className="text-500">{income.label}</span>
                                </div>
                                <div className="card-dash-body">
                                    <div className="flex justify-content-between align-items-center">
                                        <div>
                                            <p className="font-bold text-2xl" style={{
                                                color: income.colorText
                                            }}>{income?.value}</p>
                                            <span className="text-500 text-base">{income.type}</span>
                                        </div>
                                        {income.icon}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
                {IconRightCard}
            </Card>
        </React.Fragment>
    )
}