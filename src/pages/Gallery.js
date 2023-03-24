import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';
import { Fade } from 'react-awesome-reveal';

function Gallery() {
  // State to determine if the Footer should be shown or not
  const [showFooter, setShowFooter] = useState(false);

  // Use effect to show the Footer after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 3000);
    
    // Clean up function to clear the timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Navigation component */}
      <Navigation />

      {/* Gallery section */}
      <section id="Gallery" className="info_sec">
        <div className="container gallery-container">
          <div className="row">
            {/* GalleryImages component */}
            <GalleryImages />
          </div>
        </div>
      </section>

      {/* Footer component (only shown after 3 seconds) */}
      {showFooter && <Fade><Footer /></Fade>}
    </>
  );
}

export default Gallery;