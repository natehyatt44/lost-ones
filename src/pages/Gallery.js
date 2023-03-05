import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';
import { Fade } from 'react-awesome-reveal';

function Gallery() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />
      <section id="Gallery" className="info_sec">
        <div className="container gallery-container">
          <div className="row">
            <GalleryImages />
          </div>
        </div>
      </section>
      {showFooter && <Fade><Footer /></Fade>}
    </>
  );
}

export default Gallery;
