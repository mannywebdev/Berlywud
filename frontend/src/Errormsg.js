import React from 'react'
import './Errormsg.css'

function Errormsg(props) {
    return (
        <div className="errormsg">
            {props.children}
        </div>
    )
}

export default Errormsg
