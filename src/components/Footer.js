import React from "react";
import footerCss from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={footerCss.footer}>
            <div className={footerCss.footerContainer}>
                <div className={footerCss.header}>
                    <h1 className={footerCss.logo}>Bandage</h1>
                </div>
                <div className={footerCss.footerContent}>
                    <div className={footerCss.links}>
                        <h5 className={footerCss.linksHeader}>Company Info</h5>
                        <p className={footerCss.link}>About Us</p>
                        <p className={footerCss.link}>Carrier</p>
                        <p className={footerCss.link}>We are hiring</p>
                        <p className={footerCss.link}>Blog</p>
                    </div>
                    <div className={footerCss.links}>
                        <h5 className={footerCss.linksHeader}>Legal</h5>
                        <p className={footerCss.link}>About Us</p>
                        <p className={footerCss.link}>Carrier</p>
                        <p className={footerCss.link}>We are hiring</p>
                        <p className={footerCss.link}>Blog</p>
                    </div>
                    <div className={footerCss.links}>
                        <h5 className={footerCss.linksHeader}>Features</h5>
                        <p className={footerCss.link}>Business Marketing</p>
                        <p className={footerCss.link}>User Analytic</p>
                        <p className={footerCss.link}>Live chat</p>
                        <p className={footerCss.link}>Unlimited Support</p>
                    </div>
                    <div className={footerCss.links}>
                        <h5 className={footerCss.linksHeader}>Resources</h5>
                        <p className={footerCss.link}>IOS & Android</p>
                        <p className={footerCss.link}>Watch a Demo</p>
                        <p className={footerCss.link}>Customers</p>
                        <p className={footerCss.link}>API</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
