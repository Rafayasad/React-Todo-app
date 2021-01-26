import React from 'react'
import LOGOIMAGE from '../images/logos.png'

class Logo extends React.Component{
    render(){
        return(
            <div className="logodiv">
                <img className="img" src={LOGOIMAGE} width="60px" alt="logo" />
            </div>
        )
    }
}

export default Logo;