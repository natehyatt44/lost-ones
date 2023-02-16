import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';
const { Slide } = require("react-awesome-reveal");


function Gallery() {
    
  return (
      <>
      <Navigation />
      <Slide>
      <section id="Gallery " className="info_sec ">
      <div className="container gallery-container">
      
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row">
                    <div class="row">
                        <GalleryImages></GalleryImages>
                    </div>
                </div>
              </div>
          </div>
      </div>
      </section>
      </Slide>
      <Footer />
      </>
  );
}

export default Gallery;
