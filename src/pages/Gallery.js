import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import GalleryItem from '../components/GalleryItem'



function Gallery() {
    
  return (
      <>
      
      <Navigation />
      <div class="container gallery-container">
          <div class="row">
              <div class="col-xl-12 col-sm-12">
                <div class="row">
                        <div class="row">
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\4.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\8.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\16.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\17.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\18.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\27.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\28.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\29.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\54.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\57.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\60.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\67.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\76.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\84.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\86.png"></img>
                                </div>
                            </div>
                        </div>
                </div>
              </div>
          </div>
      </div>
      <Navigation />
      </>
  );
}

export default Gallery;