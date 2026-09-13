// ============================================================
// carousel.js — simple image carousel for case study pages
// ============================================================

(function(){
  document.querySelectorAll('.cs-carousel').forEach(function(carousel){
    var track = carousel.querySelector('.cs-carousel-track');
    var slides = track.children;
    var dots = carousel.querySelectorAll('.cs-carousel-dots span');
    var caption = carousel.querySelector('.cs-carousel-caption');
    var captions = JSON.parse(carousel.dataset.captions || '[]');
    var i = 0;

    function show(n){
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      dots.forEach(function(d, idx){ d.classList.toggle('active', idx === i); });
      if(caption && captions[i]) caption.textContent = captions[i];
    }

    carousel.querySelector('.prev').addEventListener('click', function(){ show(i - 1); });
    carousel.querySelector('.next').addEventListener('click', function(){ show(i + 1); });
    dots.forEach(function(d, idx){ d.addEventListener('click', function(){ show(idx); }); });

    show(0);
  });
})();
