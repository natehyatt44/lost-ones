import React from 'react';
import questions from "../mappings/faq.json";
import Banner from "../components/FaqInfo"
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
const { Slide } = require("react-awesome-reveal");



function FAQ() {
  return (
   <> 
   <Navigation />
   <section id="faq " className="info_sec ">
   <Banner>
    <Slide>
    <Banner.Header><h1 className="h1_heading set_font"> FAQ </h1></Banner.Header>
      {questions.map((question) => (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answers}</Banner.Text>
        </Banner.Entity>
      ))}
      </Slide>
    </Banner>
   {}
   </section>
   <Footer />
	</>
  );
};

export default FAQ;
