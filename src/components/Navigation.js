import React from 'react';

function Navigation() {

    return (
        <div className="container-fluid bg-nav m-auto justify-content-center">
            <nav className="navbar navbar-expand-lg navbar-light ">
                <a className="navbar-brand " href="/"><img className="logo_s" src="assets/images/logo.png" alt="navimg"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav m-auto justify-content-center">
                        <li className="nav-item"> <a className="navbar-brand hd_m" href="/"><img className="logo_s logo_m" src="assets/images/barbarianinc_logo.png" alt="navimg"/></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/play">The Lost Ones</a>
                        </li> 
                        <li className="nav-item">
                        <a className="nav-link" href="https://hbarbarians.gitbook.io/hbarbarians/">About</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/gallery">Gallery</a>
                        </li>
                    </ul>
                    <span className="navbar-text" >
                    <a href="https://twitter.com/barbarian_ink" target={{target:"_blank"}}>
                        <img className="seicon" src="assets/images/icon/icon_twitter.svg" alt="navimg"/>
                    </a>
                    <a href="https://discord.gg/aCucjcJtWM" target={{target:"_blank"}}>
                        <img className="seicon" src="assets/images/icon/icon_discord.svg" alt="navimg"/>
                    </a>
                    </span>
                </div>
            </nav>
        </div>
    )
}

export default Navigation
