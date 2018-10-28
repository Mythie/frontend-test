// Bind our masonry and imagesLoaded functionality to onLoad to ensure
// that it always styles correctly. If this isn't done there is a small chance
// that the layout will break.
window.onload = function () {
  
  /* Slider Actions */

  // Get the images we want to add to the slider.
  const images = document.querySelectorAll('.image-item');
  // Get the slider-bars
  const bars = document.getElementById('slider-bars');

  // For every image
  for (let i = 0; i < images.length; i++) {
    // Clone it
    const image = images[i].cloneNode();
    // Remove the image-item class as it will display:none the image.
    // Potentially remove all classes if we wanted this to be extendable.
    image.classList.remove('image-item');
    // Add the slider-item class incase we want to style it.
    image.classList.add('slider-item');

    // Append the clone to the slider div
    document.getElementById('slider').append(image);

    // Create a barItem div
    const barItem = document.createElement('div');
    // Set the slider metadata
    barItem.setAttribute('slider-goto', i);
    // Add the slider-bar class
    barItem.classList.add('slider-bar');
    // Append it to the slider-bars
    bars.append(barItem);
  }


  // Instantiate the slider
  const slider = new Siema({
    selector: '#slider',
    duration: 200,
    onInit() {
      const barItems = document.querySelectorAll('#slider-bars > div');
      console.log(barItems);
      for (let i = 0; i < barItems.length; i++) {
        barItems[i].classList.remove('slider-bar-active');
        barItems[i].addEventListener('click', function () {
          slider.goTo(i);
        });
        if (this.currentSlide === i) {
          barItems[i].classList.add('slider-bar-active');
        }
      }
    },
    onChange() {
      const barItems = document.querySelectorAll('#slider-bars > div');
      for (let i = 0; i < barItems.length; i++) {
        barItems[i].classList.remove('slider-bar-active');
        if (this.currentSlide === i) {
          barItems[i].classList.add('slider-bar-active');
        }
      }
    }
  });

  /* Masonry Actions */

  const grid = document.getElementById('grid');

  // Using a lambda (arrow function) won't work here because it ruins the this scope.
  imagesLoaded(grid, function () {
    new Masonry(grid);
  });
}