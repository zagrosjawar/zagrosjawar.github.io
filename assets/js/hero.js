// ============================================================
// hero.js — "Clarity from Chaos" particle animation + nav echo
// ============================================================

(function(){
  var colors = ['#589167','#2CAAD7','#6B5CA5','#CE724F','#F5C26F','#5C5953'];

  function buildField(){
    var field = document.getElementById('hero-field');
    var periodTarget = document.getElementById('hero-period');
    var h1 = document.getElementById('hero-h1');
    if(!field || !periodTarget || !h1) return;

    // Respect reduced motion: don't even build the particles
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    field.innerHTML = '';

    var heroBox = field.getBoundingClientRect();
    var periodBox = periodTarget.getBoundingClientRect();
    var h1Box = h1.getBoundingClientRect();

    var targetX = periodBox.left - heroBox.left + periodBox.width/2;
    var targetY = periodBox.top - heroBox.top + periodBox.height/2;

    var dot = document.createElement('div');
    dot.className = 'resolve-dot';
    dot.style.setProperty('--dotx', (targetX-3.5)+'px');
    dot.style.setProperty('--doty', (targetY-3.5)+'px');
    field.appendChild(dot);

    var ring = document.createElement('div');
    ring.className = 'resolve-ring';
    ring.style.setProperty('--dotx', (targetX-3.5)+'px');
    ring.style.setProperty('--doty', (targetY-3.5)+'px');
    field.appendChild(ring);

    // particles gather in a line along the top edge of the headline
    var n = 16;
    var gridY = (h1Box.top - heroBox.top) - 14;
    var gridSpan = Math.min(h1Box.width * 0.7, 380);
    var gridStartX = (h1Box.left - heroBox.left) + (h1Box.width - gridSpan) / 2;
    var gridStep = gridSpan / (n - 1);

    for(var i=0;i<n;i++){
      var p = document.createElement('div');
      p.className = 'p';
      var sx = Math.random()*heroBox.width;
      var sy = Math.random()*heroBox.height;
      var sz = 4 + Math.random()*6;
      var jx = (Math.random()-0.5)*40;
      var jy = (Math.random()-0.5)*40;
      var gridPointX = gridStartX + i*gridStep;
      var gx = gridPointX - sx;
      var gy = gridY - sy;
      var tx = targetX - sx;
      var ty = targetY - sy;
      var pd = (Math.random()*0.35).toFixed(2);
      var pc = colors[i % colors.length];

      p.style.setProperty('--sx', sx+'px');
      p.style.setProperty('--sy', sy+'px');
      p.style.setProperty('--sz', sz+'px');
      p.style.setProperty('--jx', jx+'px');
      p.style.setProperty('--jy', jy+'px');
      p.style.setProperty('--gx', gx+'px');
      p.style.setProperty('--gy', gy+'px');
      p.style.setProperty('--tx', tx+'px');
      p.style.setProperty('--ty', ty+'px');
      p.style.setProperty('--pd', pd+'s');
      p.style.setProperty('--pc', pc);
      field.appendChild(p);
    }

    // Nav-dot echo — now works for real, no cross-frame messaging needed
    setTimeout(function(){
      var navDot = document.querySelector('.brand-dot');
      if(navDot){
        navDot.classList.remove('echo-pulse');
        void navDot.offsetWidth; // restart animation
        navDot.classList.add('echo-pulse');
      }
    }, 2650);
  }

  // Wait for fonts to finish loading before measuring text positions
  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(buildField);
  } else {
    buildField();
  }
  window.addEventListener('resize', buildField);
})();
