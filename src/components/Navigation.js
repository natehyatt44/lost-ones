import React from 'react';

function Navigation() {

    return (
        <div className="container-fluid bg-nav">
            <nav className="navbar navbar-expand-lg navbar-light ">
                <a className="navbar-brand " href="/"><img className="logo_s" src="assets/images/logo.png" alt="navimg"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item"> <a className="navbar-brand hd_m" href="/"><img className="logo_s logo_m" src="assets/images/logo.png" alt="navimg"/></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/gallery">Gallery</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/team">Team</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/lore">Lore</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/whitepaper">Whitepaper</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/litepaper">Litepaper</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/roadmap">RoadMap</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/faq">FAQ</a>
                        </li>
                    </ul>
                    <span className="navbar-text" >
                    <a href="https://twitter.com/barbarianinc " target={{target:"_blank"}}>
                        <img className="seicon" src="assets/images/icon/icon_twitter.svg" alt="navimg"/>
                    </a>
                    <a href="https://discord.gg/vBuf9M4U" target={{target:"_blank"}}>
                        <img className="seicon" src="assets/images/icon/icon_discord.svg" alt="navimg"/>
                    </a>
                    </span>
                </div>
            </nav>
        </div>
    )
}

export default Navigation
