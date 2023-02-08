import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GalleryImages from '../components/GalleryImages';
const { Slide } = require("react-awesome-reveal");


function Gallery() {
    
  return (
      <>
      <Navigation />
      <section id="Lore " className="info_sec ">
      <div class="container gallery-container">
      <Slide>
          <div class="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="row">
                    <div class="row">
                        <GalleryImages></GalleryImages>
                    </div>
                </div>
              </div>
          </div>
      </Slide>
      </div>
      </section>
      <Footer />
      </>
  );
}

export default Gallery;
