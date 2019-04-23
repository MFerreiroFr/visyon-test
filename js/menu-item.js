AFRAME.registerComponent('menu-item', {
  schema: {
    media: { type: 'string' },
    asset: { type: 'string' }
  },

  init: function() {
    const el = this.el;
    const data = this.data;
    const cursor = document.querySelector('#cursor');
    let backgroundChange;
    const scene = document.querySelector('a-scene');
    const video360Controls = document.querySelector('#video360Controls');
    const videoControls = document.querySelector('#videoControls');
    const img = document.querySelector('#img');

    el.addEventListener('mouseenter', function() {
      cursor.setAttribute('animation', {
        property: 'scale',
        from: '1 1 1',
        to: '3 3 3',
        dur: '1500'
      });

      backgroundChange = setTimeout(() => {
        el.setAttribute('material', {
          opacity: '0.5'
        });
        const active = document.querySelector('#active');
        if (active !== null && active !== el) {
          active.setAttribute('material', {
            opacity: '0'
          });

          active.id = '';
        }

        el.id = 'active';

        let target;

        switch (data.media) {
          case '360':
            target = document.querySelector('#sky');
            const video = document.getElementById('london');
            video.isPaused ? '' : video.pause();
            video360Controls.setAttribute('src', '#play');
            video360Controls.setAttribute('scale', '0 0 1');
            break;
          case 'img':
            target = document.querySelector('#img');
            videoControls.setAttribute('scale', '0 0 0');
            break;
          case 'video':
            target = img;
            videoControls.setAttribute('scale', '0.25 0.25 0.25');
            break;
          case '360video':
            target = document.querySelector('#sky');
            video360Controls.setAttribute('scale', '-0.5 0.5 1');
            break;
        }

        target.setAttribute('animation__fade', {
          property: 'material.color',
          to: '#000',
          dur: '300',
          startEvents: 'fade'
        });

        target.setAttribute('animation__fadeback', {
          property: 'material.color',
          to: '#FFF',
          dur: '300',
          delay: '300',
          startEvents: 'animationcomplete__fade'
        });
        target.emit('fade');
        setTimeout(() => {
          target.setAttribute('material', 'src', data.asset);
        }, 300);
      }, 1500);
    });

    el.addEventListener('mouseleave', function() {
      cursor.setAttribute('scale', '1 1 1');
      cursor.removeAttribute('animation');
      clearTimeout(backgroundChange);
    });
  }
});
