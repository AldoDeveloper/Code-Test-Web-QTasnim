
import React from "react";
import { Avatar } from 'primereact/avatar'
import { motion } from 'framer-motion'
import { AnimateShowListContainer } from "../../animation/props.animation";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const itemsList = {
    hidde: {
        opacity: 0,
        x: -20
    },

    show: {
        opacity: 1,
        x: 1,
    }
}

export default function SidebarTemplateNotif(): React.ReactNode | React.ReactElement {

    const [page, setPage] = React.useState<PaginatorPageChangeEvent>({
        first: 0,
        rows: 5,
        page: 0,
        pageCount: 0
    });

    const onPageChanges = (event: PaginatorPageChangeEvent) => {
        setPage(event)
    }

    return (
        <React.Fragment>
            <motion.ul
                key={Math.floor(Math.random() / 2 * 100)}
                initial={"hidde"}
                animate={"show"}
                variants={AnimateShowListContainer}
                className="submenu">
                {
                    Array.from({ length: 50 }).slice((page.first > 0 ? (page.first - page.rows) : page.first), page.first > 0 ? page.first : page.rows).map((__, index) => (
                        <motion.li
                            className="cursor-pointer"
                            key={index}
                            whileHover={{
                                backgroundColor: 'var(--main--color)',
                                borderRadius: '25px',
                                color: '#fff',
                                transition: {
                                    duration: 0
                                }
                            }}
                            whileTap={{
                                backgroundColor: 'red',
                                scale: 0.8,
                                transition: {
                                    duration: 0.15
                                }
                            }}
                            variants={itemsList}>
                            <div className="flex gap-3">
                                <Avatar
                                    className="align-self-center"
                                    shape="circle"
                                    size="normal"
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(34,195,152,1) 0%, rgba(80,197,255,1) 100%)'
                                    }}
                                    template={<h4 className="text-white">A</h4>} />
                                <div>
                                    <span className="align-self-center text-700">Ahsabhc {Math.floor(Math.random() / 2 * 50)}</span>
                                    <p className="text-500 text-xs font-semibold">asbcjka</p>
                                </div>
                            </div>
                        </motion.li>
                    ))
                }
            </motion.ul>
            <Paginator
                first={page?.first}
                rows={5}
                className="mt-1"
                totalRecords={50}
                onPageChange={onPageChanges}
                template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
        </React.Fragment>
    )
}