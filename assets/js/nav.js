// ============================================================
// nav.js — scroll hairline + mobile menu toggle
// ============================================================

(function(){
  var nav = document.getElementById('site-nav');
  if(!nav) return;

  // Scroll hairline: adds .scrolled once the page scrolls past ~10px
  function onScroll(){
    if(window.scrollY > 10){
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Mobile menu toggle
  var menuBtn = document.getElementById('nav-menu-btn');
  if(menuBtn){
    menuBtn.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      menuBtn.textContent = isOpen ? 'CLOSE' : 'MENU';
    });
  }

  // Close mobile menu after tapping any link inside it
  var mobileLinks = nav.querySelectorAll('.nav-mobile-panel a');
  mobileLinks.forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('open');
      if(menuBtn) menuBtn.textContent = 'MENU';
    });
  });
})();
