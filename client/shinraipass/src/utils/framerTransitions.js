
export const showSideBar = {
    hidden: {
        width: '70px',
        transition: {
            when: "afterChildren",           
        }
    },
    visible:{
        width: '250px',
        transition: {
            when: "beforeChildren",
        }
    }
}

export const sideMenuText = (delay) =>({
    hidden: {
        opacity: 0, 
        transition: {
            delay 
        }
    },
    visible: {      
        opacity: 1,
        transition: {
            delay 
        }
    }
}); 

export const arrowAnimation = {
    closed:{
        rotate: 360,
        transition: {
            duration: 0.8,
        }
    },
    open:{
        rotate: 180,
        transition: {
            duration: 0.8,          
        }
    }
}

export const textAnimation = (delay,direction) => ({
    hidden: {
        opacity: 0,
        y: direction === 'up' ? '-70%' : direction === 'down' ? '70%' : 0,
    },
    visible: {
        opacity:1,
        y:0,
        transition: {
            delay,
            duration: 1.5,
            bounce:0           
        },
    }
})

export const sandwichMenuTop = {
    inactive: {
        rotate: 0
    },
    active: {
        y:12,
        rotate: 45
    }
}

export const sandwichMenuMiddle = {
    inactive: {
        opacity: 1
    },
    active: {
        opacity:0
    }
}

export const sandwichMenuBottom = {
    inactive: {
        rotate: 0
    },
    active: {
        y:-12,
        rotate: -45
    }
}

export const navbarMenu = {
    inactive: {
        y:800,
        opacity: 0,
        transition: {
            bounce: 0,
            when: "afterChildren"
        }
    },
    active: {
        y:0,
        opacity:1,
        transition: {
            bounce:0,
            when: "beforeChildren",

        }
    }
}

export const menuText = {
    inactive: {
        y:500,
        opacity: 0, 
        transition: {
            bounce: 0,           
            duration: 0.5
        }
    },
    active: {
        y:0,
        opacity:1,
        transition: {
            bounce: 0,
            duration: 1
        }
    }
}

export const imageAnimation = {
    hidden: {
        opacity:0,
        transition: {
            duration: 1
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        },
    }
}

export const componentAnimation = (direction,magnitude,delay) => ({

    hidden: {
        x: direction === 'left' ? '20%' : direction === 'right' ? '-20%' : 0,
        opacity: 0,
        transition: {
            bounce: 0,
        }
    },
    visible: {
        x:0,
        opacity:1,
        transition: {
            bounce:0,
            duration: 1,
            delay
        }, 
    }

})

export const buttonAnimation = (delay) =>  ({
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity:1,
        transition: {
            duration: 1,
            delay
        }, 
    },
    hover: {
        scale: 1.1,
        y: -10,
 
    }
})

export const dropdownAnimation = {
    inactive: {
        y:100,
        opacity: 0,
        transition: {
            when: "afterChildren"
        }
    },
    active: {
        y:0,
        opacity: 1,
        transition: {
            duration: 1,
            when: "beforeChildren"
        }
    }
}

export const loaderText = (delay) => ({
    closed: {
        opacity: 0,
        y: 50
    },
    opened: {
        opacity: 1, 
        y:0 ,
        transition: {
            duration: 1,
            delay,
            bounce: 0
        } 
    }
})

export const loaderGate = {
    closed: {
        opacity:1,
        y:0,
        transition: {
        }
    },
    opened: { 
        y: '-100%',
        transition: {
            when: "afterChildren",
            duration: 1,
            delay: 1
        }
    }
}

