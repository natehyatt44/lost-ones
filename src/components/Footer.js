import React from 'react';

function Footer() {

    return (
      
        <div className="footerParent">
        <div className="footer">
            <a href="/" target={{target:"_blank"}}>
                <img className="footer_seicon" src="assets/images/logo.png" alt="footerimg"/>
            </a>
            <a href="https://twitter.com/barbarianinc" target={{target:"_blank"}}>
                <img className="footer_seicon" src="assets/images/icon/icon_twitter.svg" alt="footerimg"/>
            </a>
            <a href="https://discord.gg/BW2BJJKxxg" target={{target:"_blank"}}>
                <img className="footer_seicon" src="assets/images/icon/icon_discord.svg" alt="footerimg"/>
            </a>
        </div>
        </div>
    )
}

export default Footer
