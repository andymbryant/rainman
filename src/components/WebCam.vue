<template>
  <div v-if='!loading' id="liveView" class="camView" >
    <button v-if='!isWebCamEnabled' id="webCamButton" @click='enableWebCam'>Enable Webcam</button>
    <video v-show='isWebCamEnabled' id="webCam" ref='webcam' width='400' height='300' autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'WebCam',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      isWebCamEnabled: false,
      video: null,
      children: [],
      predictions: [],
    };
  },
  methods: {
    async bindVideo() {
      setTimeout(() => {
        this.video = this.$refs.webcam;
        this.$refs.webcam.addEventListener('loadeddata', this.predict);
      }, 100);
    },
    async enableWebCam(event) {
      const constraints = { video: true };
      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => this.video.srcObject = stream)
        .then(() => this.isWebCamEnabled = true)
        .catch((err) => console.error(err));
    },
    predict() {
      this.model.detect(this.video).then((preds) => {
        console.log(preds);
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < this.children.length; i++) {
          this.liveView.removeChild(this.children[i]);
        }
        this.children.splice(0);

        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < preds.length; n++) {
          const { predictions } = this;
          // If we are over 66% sure we are sure we classified it right, draw it!
          if (predictions[n].score > 0.66) {
            const p = document.createElement('p');
            p.innerText = `${predictions[n].class} - with ${Math.round(parseFloat(predictions[n].score) * 100)}% confidence.`;
            p.style = `margin-left: ${predictions[n].bbox[0]}px; margin-top: ${
              predictions[n].bbox[1] - 10}px; width: ${
              predictions[n].bbox[2] - 10}px; top: 0; left: 0;`;

            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = `left: ${predictions[n].bbox[0]}px; top: ${
              predictions[n].bbox[1]}px; width: ${
              predictions[n].bbox[2]}px; height: ${
              predictions[n].bbox[3]}px;`;

            this.liveView.appendChild(highlighter);
            this.liveView.appendChild(p);
            this.children.push(highlighter);
            this.children.push(p);
          }
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(this.predict);
      });
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.bindVideo()
      .then(() => this.loading = false);
    // this.enableWebcam().then(() => this.predict());
  },
};
</script>

<style scoped>
#liveView {
  width: 400px;
  height: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#webCamButton {
  width: 200px;
  height: 75px;
}

.camView p {
  position: absolute;
  padding: 5px;
  background-color: rgba(255, 111, 0, 0.85);
  color: #FFF;
  border: 1px dashed rgba(255, 255, 255, 0.7);
  z-index: 2;
  font-size: 12px;
}

.highlighter {
  background: rgba(0, 255, 0, 0.25);
  border: 1px dashed #fff;
  z-index: 1;
  position: absolute;
}
</style>
