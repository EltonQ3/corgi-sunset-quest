// Keep the landscape game inside Safari's visible viewport, independent of
// document scroll, browser chrome and canvas focus. No game state changes here.
(() => {
  const root = document.documentElement;
  const landscape = window.matchMedia('(pointer:coarse) and (orientation:landscape)');
  const viewport = window.visualViewport;
  let entered = false, frame = 0;
  function update() {
    frame = 0;
    const active = landscape.matches;
    root.classList.toggle('game-landscape', active);
    if (active && !entered) window.scrollTo({left:0, top:0, behavior:'instant'});
    entered = active;
    if (!active) return;
    const fullscreen = !!document.fullscreenElement;
    const width = fullscreen ? window.innerWidth : (viewport?.width || window.innerWidth);
    const height = fullscreen ? window.innerHeight : (viewport?.height || window.innerHeight);
    if (!(width > 0 && height > 0)) return;
    root.style.setProperty('--game-width', `${width}px`);
    root.style.setProperty('--game-height', `${height}px`);
    root.style.setProperty('--game-left', `${fullscreen ? 0 : (viewport?.offsetLeft || 0)}px`);
    root.style.setProperty('--game-top', `${fullscreen ? 0 : (viewport?.offsetTop || 0)}px`);
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  // Rotation and browser-toolbar animations can settle over several frames.
  // Use their actual resize/scroll events, not a one-time orientation measurement.
  landscape.addEventListener('change', schedule);
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('orientationchange', schedule, {passive:true});
  window.addEventListener('pageshow', schedule);
  document.addEventListener('fullscreenchange', schedule);
  document.addEventListener('visibilitychange', schedule);
  viewport?.addEventListener('resize', schedule, {passive:true});
  viewport?.addEventListener('scroll', schedule, {passive:true});
  update();
})();
