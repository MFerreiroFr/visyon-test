AFRAME.registerComponent('menu-nav', {
  schema: {
    dist: { type: 'number', default: 0.25 },
    dir: { type: 'string', default: 'next' },
    dur: { type: 'number', default: 1000 },
    visibleElements: { type: 'number', default: 4 }
  },

  init: function() {
    const el = this.el;
    const data = this.data;
    let offset = 0;
    const movables = document.querySelectorAll('.movable');
    const plane = document.querySelector('#menu');
    const scrollBar = document.querySelector('#scroll-bar');

    data.dir === 'prev' ? (data.dist *= -1) : '';
    for (let i = data.visibleElements; i < movables.length; i++) {
      movables[i].setAttribute('scale', '0 0.0001 0');
    }

    el.addEventListener('click', function() {
      offset += data.dist;

      const scrollDir = data.dir === 'prev' ? 0.039 : -0.039;
      if (
        (el.getAttribute('click-disabled') === null && data.dir === 'prev' && movables[0].object3D.scale.y === 0.0001) ||
        (el.getAttribute('click-disabled') === null && data.dir === 'next' &&
          movables[movables.length - 1].object3D.scale.y === 0.0001)
      ) {
        el.setAttribute('click-disabled');
        scrollBar.setAttribute('animation', {
          property: 'object3D.position.y',
          to: scrollBar.object3D.position.y + scrollDir,
          dur: data.dur
        });

        movables.forEach(movable => {
          if (
            movable.object3D.position.y + data.dist >=
              plane.object3D.scale.y / (plane.object3D.scale.y * 2) ||
            movable.object3D.position.y + data.dist <
              plane.object3D.scale.y / (plane.object3D.scale.y * -2)
          ) {
            movable.setAttribute('animation__scale', {
              property: 'scale',
              to: '0 0 0',
              dur: 300
            });
          } else {
            movable.setAttribute('animation__scale', {
              property: 'scale',
              to: '1 0.25 0.01',
              dur: 300
            });
          }
  
          movable.setAttribute('animation', {
            property: 'object3D.position.y',
            to: movable.getAttribute('position').y + data.dist,
            dur: data.dur
          });
        });
        setTimeout(() => {
          el.removeAttribute('click-disabled');
        }, data.dur < 300 ? 300 : data.dur);
        
      }
      
    });
  }
});
