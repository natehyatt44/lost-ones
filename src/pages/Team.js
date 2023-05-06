// src/Roadmap.js
import React from "react";
import { Element } from "react-scroll";
import Sign from "../components/Sign";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


const Team = () => {
    const signs = [
        { content: "Sign 1", position: "left" },
        { content: "Sign 2", position: "right" },
        { content: "Sign 3", position: "left" },
        { content: "Sign 4", position: "right" },
        { content: "Sign 5", position: "left" },
      ];

  return (
    <>
    <Navigation />
    <div className="roadmap">
      <Element name="roadmap">
      {signs.map((sign, index) => (
        <Sign key={index} content={sign.content} position={sign.position} />
      ))}
      </Element>
    </div>
    <section className={`footer`}>
    <Footer />
    </section>
    </>
  );
};

export default Team;
