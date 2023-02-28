import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';
import { Fade } from 'react-awesome-reveal';

function Gallery() {
    
  return (
      <>
      <Navigation />
      <section id="Gallery " className="info_sec ">
      <div className="container gallery-container">
          <div className="row">
            <GalleryImages/>
          </div>
      </div>
      </section>
      <Fade delay={1500}>
      <Footer />
      </Fade>
      </>
  );
}

export default Gallery;
