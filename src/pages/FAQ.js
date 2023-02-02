import React from 'react';
import questions from "../mappings/faq.json";
import Banner from "../components/FaqInfo"
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LightSpeed from 'react-reveal/LightSpeed';

function FAQ() {
    
  return (
   <> 
   <Navigation />
   <Banner>
    <LightSpeed left>
      <Banner.Header>Frequently Asked Questions</Banner.Header>
      {questions.map((question) => (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answers}</Banner.Text>
        </Banner.Entity>
      ))}
      </LightSpeed>
    </Banner>
   {}
   <Footer />
	</>
  );
}

export default FAQ;
