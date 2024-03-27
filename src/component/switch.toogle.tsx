import React from "react";
import { motion } from 'framer-motion';

interface PropsOptions{
    styleScss : CSSModuleClasses;
    checked   : boolean;
    onChange  ?: () => void
}

export default function SwitchToogle({ styleScss, checked, onChange }: PropsOptions): React.ReactNode | React.ReactElement {
    return (
        <React.Fragment>
            <span 
                className={`${styleScss.switch} ${checked ? styleScss.actived : ''} `} 
                onClick={onChange}>
                <motion.div
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30
                    }}
                    className={styleScss['switch-rounded']} />
            </span>
        </React.Fragment>
    )
}