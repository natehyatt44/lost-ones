import React from 'react';
import questions from "../mappings/faq.json";
import Banner from "../components/FaqInfo"
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function FAQ() {
    
  return (
   <> 
   <Navigation />
   <Banner>
      <Banner.Header>Frequently Asked Questions</Banner.Header>
      {questions.map((question) => (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answers}</Banner.Text>
        </Banner.Entity>
      ))}
    </Banner>
   {}
   <Footer />
	</>
  );
}

export default FAQ;
