// Bind our masonry and imagesLoaded functionality to onLoad to ensure
// that it always styles correctly. If this isn't done there is a small chance
// that the layout will break.
window.onload = function () {
  
  const grid = document.getElementById('grid');

  if(window.innerWidth > 767) {
    // Using a lambda (arrow function) won't work here because it ruins the this scope.
    imagesLoaded(grid, function () {
      new Masonry(grid);
    });
  } else {
    // Get the slider
    const images = document.querySelectorAll('.image-item');
    const bars = document.getElementById('slider-bars');

    for (let i = 0; i < images.length; i++) {
      document.getElementById('slider').append(images[i]);

      const barItem = document.createElement('div');
      barItem.setAttribute('slider-goto', i);
      barItem.classList.add('slider-bar');
      bars.append(barItem);
    }


    const slider = new Siema({
      selector: '#slider',
      duration: 200,
      onInit() {
        const barItems = document.querySelectorAll('#slider-bars > div');
        console.log(barItems);
        for (let i = 0; i < barItems.length; i++) {
          if (this.currentSlide === i) {
            barItems[i].classList.add('slider-bar-active');
          }
          barItems[i].classList.remove('slider-bar-active');
          barItems[i].addEventListener('click', function () {
            slider.goTo(i);
          });
        }
      },
      onChange() {
        const barItems = document.querySelectorAll('#slider-bars > div');
        for(let i = 0; i < barItems.length; i++) {
          barItems[i].classList.remove('slider-bar-active');
          if(this.currentSlide === i) {
            barItems[i].classList.add('slider-bar-active');
          }
        }
      }
    });
    console.log(slider);
  }
}