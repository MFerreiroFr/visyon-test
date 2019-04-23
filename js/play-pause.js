AFRAME.registerComponent('play-pause', {
  schema: {
    sky: {type: 'boolean', default: false}
  },
  init: function () {
    const data = this.data;
    this.el.addEventListener('click', function () {
      const video = data.sky ? document.querySelector('#sky') : document.querySelector('#img');
      const videoControls = data.sky ? document.querySelector('#video360Controls') : document.querySelector('#videoControls');
      const myVideo = video.getAttribute('material').src
      if (!myVideo.paused) {
        myVideo.pause();
        videoControls.setAttribute('src', '#play');
      } else {
        myVideo.play();
        videoControls.setAttribute('src', '#pause');
      }
    });
  }
});