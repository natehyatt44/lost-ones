import React from 'react';

function GalleryItem(props) {

    return (
        <div class="gallery-item">
            <img src="assets\images\gallery\4.png"></img>
            <title>{props.title}</title>
            <p>{props.description}</p>
        </div>
    )
}

export default GalleryItem

