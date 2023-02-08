import React from 'react';


function GalleryImages() {

    var numImages = 21;
    const imagehtml = [];
    for (var i = 1; i <= numImages; i++) {
        imagehtml.push(`assets/images/gallery/${i}.png`)
    }

    const html = imagehtml.map(image =>               
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div class="gallery-item">
                <img src={image} alt="galleryimg"/>
            </div>
        </div>
        )

    return (
        html  
    )
}

export default GalleryImages 