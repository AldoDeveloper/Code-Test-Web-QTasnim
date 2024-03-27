
export const TransitionAnimate = {

    show: {
        opacity: 1,
        y: 1,
    },

    hidde: {
        opacity: 0,
        y: -12
    },

    exite: {
        opacity: 0,
        y: -12,
        transition: {
            duration: 0.2
        }
    }
}

export const TransitionSidebarVisible = {

    show: {
        opacity: 1,
        x: 1,
        transition: {
            delay: 0.4
        }
    },

    hidde: {
        opacity: 0,
        x: -12
    },

    exite: {
        opacity: 0,
        x: -12,
        transition: {
            duration: 0.2
        }
    }
}

export const AnimateShowListContainer = {
    hidde: {
        opacity: 0,
        y: -12
    },
    show: {
        opacity: 1,
        y: 1,
        transition: {
            staggerChildren: 0.2
        }
    },
}