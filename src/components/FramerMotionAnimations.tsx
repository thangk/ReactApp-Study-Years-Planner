export const popupAnimation = {

    initial: {
        opacity: 0,
        top: '20rem'
    },
    animate: {
        opacity: 1,
        top: '23rem'
    },
    transition: {
        duration: 0.25,
        ease: 'easeOut'
    },
    exit: {
        opacity: 0,
        height: '1rem'
    }
}

export const yearChangeAnimation = {

    initial: {
        opacity: 0,
        y: 0
    },
    animate: {
        opacity: 1,
        y: -2
    },
    transition: {
        duration: 0.25,
        ease: 'easeOut'
    },
    exit: {
        opacity: 0,
        // y: -100,
        // height: '1rem'
    }
}

export const backgroundBlockAnimation = {

    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

export const clearCoursesYearsAnimation = {

}

export const errorAnimation = {

    initial: {
        opacity: 0,
        top: '20rem'
    },
    animate: {
        opacity: 1,
        top: '23rem'
    },
    transition: {
        duration: 0.25,
        ease: 'easeOut',
        damping: 15
    },
    exit: {
        opacity: 0,
        height: '23rem'
    }
}