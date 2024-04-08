import React from 'react'
import { logo } from '../Resources/Icons'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()
    return (
        <div>
            {/* ------------------------Footer----------------------------- */}
            <footer className="cleartrip-footer">
                <div className="footer-top">
                    <div className="footer-logo">{logo}</div>
                    <div className="footerlinkscontainer flexXY">
                        <div className="footer-links">
                            <h3>Company</h3>
                            <ul className='c'><li onClick={()=>navigate('/ComingSoon')}><a >About Us</a></li><li onClick={()=>navigate('/ComingSoon')}><a>Contact Us</a></li><li onClick={()=>navigate('/ComingSoon')}><a>Careers</a></li></ul>
                        </div>
                        <div className="footer-links">
                            <h3>Products</h3>
                            <ul className='c'><li onClick={()=>navigate('/')}><a>Flights</a></li><li onClick={()=>navigate('/Hotel')}><a >Hotels</a></li><li onClick={()=>navigate('/ComingSoon')}><a >Trains</a></li></ul>
                        </div>
                        <div className="footer-links">
                            <h3>Legal</h3>
                            <ul className='c'><li onClick={()=>navigate('/ComingSoon')}><a >Privacy Policy</a></li><li onClick={()=>navigate('/ComingSoon')}><a>Terms of Use</a></li></ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; Ayaz Qureshi 2024 Cleartrip. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
