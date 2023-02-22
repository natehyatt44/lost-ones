import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';

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
      <Footer />
      </>
  );
}

export default Gallery;
