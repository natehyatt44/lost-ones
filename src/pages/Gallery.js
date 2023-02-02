import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import GalleryItem from '../components/GalleryItem'
import Footer from '../components/Footer';



function Gallery() {
    
  return (
      <>
      
      <Navigation />
      <div class="container gallery-container">
          <div class="row">
              <div class="col-xl-12 col-sm-12">
                <div class="row">
                        <div class="row">
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\1.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\2.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\3.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\4.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\5.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\6.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\7.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\8.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\9.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\10.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\11.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\12.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\13.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\14.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\15.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\16.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\17.png"></img>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\18.png"></img>
                                </div>
                            </div>
                        </div>
                </div>
              </div>
          </div>
      </div>
      <Footer />
      </>
  );
}

export default Gallery;