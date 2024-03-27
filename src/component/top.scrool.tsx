
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import React from 'react';
import { Avatar } from 'primereact/avatar';

const variantOption = {
    show: {
        opacity: 1,
        right: 25,
        bottom: 15,
        scale: 1,
        transition: {
            delay: 0.5
        }
    },
    hidde: {
        opacity: 0,
        right: -20,
        bottom: -20,
        scale: 0.2,
    },
    exit: {
        opacity: 0,
        right: -20,
        bottom: -20,
        scale: 0.2,
    }
}
export default function TopScrool(): React.ReactNode | React.ReactElement {

    return (
        <React.Fragment>
            <AnimatePresence>
                <motion.div
                    className='fixed'
                    initial={"hidde"}
                    animate={"show"}
                    exit={"exit"}
                    variants={variantOption}>
                    <Avatar label="A" shape="circle" size="large" />
                </motion.div>
            </AnimatePresence>
        </React.Fragment>
    )
}
