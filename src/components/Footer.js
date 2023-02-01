import React from 'react';

function Footer() {

    return (
      
        <div class="footerParent">
        <div class="footer">
                    <a href="/" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/logo.png"/>
                    </a>
                    <a href="https://twitter.com/barbarianinc" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/icon/icon_twitter.svg"/>
                    </a>
                    <a href="https://discord.gg/vBuf9M4U" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/icon/icon_discord.svg"/>
                    </a>
        </div>
        </div>
    )
}

export default Footer
