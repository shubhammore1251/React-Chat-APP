import React from 'react'
import  './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-container">
                <h2 className="footer-text">Made with</h2>
                
                <p className="footer-icons">React<span>.</span>js</p>|&nbsp;&nbsp;
                <p className="footer-icons">Node<span>.</span>js</p>|&nbsp;&nbsp;
                <p className="footer-icons">Socket<span>.</span>io</p>
            </div>
        </div>
    )
}

export default Footer
