import { useState, useEffect } from 'react';
function Home() {
    
  return (
      <>
      <div class="container gallery-container">
          <div class="row">
              <div class="col-xl-4 col-sm-12 filters">
                <h1>Gallery Filters</h1>
                <ul>
                    <li><input id="item1" name="item1" type="checkbox"></input><label for="item1">Filter 1</label></li>
                    <li><input id="item2" name="item2" type="checkbox"></input><label for="item2">Filter 2</label></li>
                    <li><input id="item3" name="item3" type="checkbox"></input><label for="item3">Filter 3</label></li>
                    <li><input id="item4" name="item4" type="checkbox"></input><label for="item4">Filter 4</label></li>
                </ul>
              </div>
              <div class="col-xl-8 col-sm-12">
                <h1>Gallery</h1>
                <div class="row">
                    <div class="col-sm-3 col-lg-6 col-xl-12">
                    <input type="text" placeholder="Search by name"class="search-input" />
                        <div class="row">
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\4.png"></img>
                                    <title>Item 1</title>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\8.png"></img>
                                    <title>Item 2</title>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\16.png"></img>
                                    <title>Item 3</title>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\17.png"></img>
                                    <title>Item 4</title>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\18.png"></img>
                                    <title>Item 5</title>
                                </div>
                            </div>
                            <div class="col-sm-12 col-xl-4">
                                <div class="gallery-item">
                                    <img src="assets\images\gallery\27.png"></img>
                                    <title>Item 6</title>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
      </>
  );
}

export default Home;