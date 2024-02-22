import React from 'react'
import { logo } from '../Services/Icons'

export default function Footer() {
    return (
        <div>
            {/* ------------------------Footer----------------------------- */}
            <footer className="cleartrip-footer">
                <div className="footer-top">
                    <div className="footer-logo">{logo}</div>
                    <div className="footerlinkscontainer flexXY">
                        <div className="footer-links">
                            <h3>Company</h3>
                            <ul><li><a href="#">About Us</a></li><li><a href="#">Contact Us</a></li><li><a href="#">Careers</a></li></ul>
                        </div>
                        <div className="footer-links">
                            <h3>Products</h3>
                            <ul><li><a href="#">Flights</a></li><li><a href="#">Hotels</a></li><li><a href="#">Trains</a></li></ul>
                        </div>
                        <div className="footer-links">
                            <h3>Legal</h3>
                            <ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li></ul>
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
