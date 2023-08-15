import React from 'react';

function Footer() {

    return (
      
        <div className="footerParent">
            <div className="row"> 
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-center p-0 footer">
                    <a href="/" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/logo.png" alt="footerimg"/>
                    </a>
                </div>
                <div className="col-7 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-center p-0 footer">
                    <p className="para_p">© 2023 HBARBARIANS LLC All Rights Reserved.</p>
                </div>
                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-center p-0 footer">
                    <a href="https://twitter.com/barbarian_ink" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/icon/icon_twitter.svg" alt="footerimg"/>
                    </a>
                </div>
                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-left p-0 footer">
                    <a href="https://discord.gg/aCucjcJtWM" target={{target:"_blank"}}>
                        <img className="footer_seicon" src="assets/images/icon/icon_discord.svg" alt="footerimg"/>
                    </a>
                </div>
            </div>   
        </div>
    )
}

export default Footer
