import React from 'react'
import classes from './Button.module.css'

const Button = ({ buttonType, onClick, children }) => {
    return (
        <button className={classes.button} type={buttonType || 'button'} onClick={onClick}>{children}</button>
    )
}

export default Button