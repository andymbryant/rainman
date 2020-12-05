<template>
<span v-if='!loading'>
  <div id="top">
    <div class='half' id="content">
      <div id='title'>
        <h1>Rainman</h1>
        <h3>Counting Cards</h3>
        <p>Description of the app and how it works and why you want to use it.</p>
      </div>
      <div id='controls'>
        <button class='btn'>Start</button>
        <button class='btn'>Reset</button>
      </div>
    </div>
    <WebCam :model='model'/>
  </div>
  <div id="cards">
    <Row v-for='suit in suits' :suit='suit' :key='suit'/>
  </div>
</span>
<div v-else>Loading Model...</div>
</template>

<script>
/* eslint-disable no-return-assign */
import Row from '@/components/Row.vue';
import WebCam from '@/components/WebCam.vue';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default {
  name: 'Home',
  components: {
    Row,
    WebCam,
  },
  data() {
    return {
      loading: false,
      model: null,
      suits: ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    };
  },
  methods: {
    async getModel() {
      tf.setBackend('cpu');
      return cocoSsd.load().then((model) => model);
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    this.getModel()
      .then((model) => this.model = model)
      .then(() => this.loading = false);
  },
};
</script>

<style>

#top {
  height: 300px;
  display: flex;
  justify-content: space-around;
}

#content {
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
}

#webcam {
  border: 1px black solid;
}

#controls {
  width: 250px;
  display: flex;
  justify-content: space-between;
}

.btn {
  width: 100px;
  height: 50px;
  font-size: 1.5rem;
}

#cards {
  width: 800px;
}

.half {
  width: 300px;
}

</style>
