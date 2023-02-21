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
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row">
                    <div className="row">
                        <GalleryImages></GalleryImages>
                    </div>
                </div>
              </div>
          </div>
      </div>
      </section>
      <Footer />
      </>
  );
}

export default Gallery;
