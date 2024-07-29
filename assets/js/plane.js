initPlane();
function initPlane() {
  const BOUNDS = 50;
  const plane = document.querySelector('.plane-container');
  plane.addEventListener('pointermove', ({ x, y }) => {
    const newX = gsap.utils.mapRange(0, window.innerWidth, -BOUNDS, BOUNDS, x);
    const newY = gsap.utils.mapRange(0, window.innerHeight, BOUNDS, -BOUNDS, y);
    gsap.set(document.documentElement, {
      '--rotate-x': newY,
      '--rotate-y': newX,
    });
  });
}
