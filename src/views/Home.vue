<template>
<div id="top">
  <div class='half' id="controls"></div>
  <div class="half" id='webcam'></div>
</div>
<div id="cards">
  <Row v-for='suit in suits' :suit='suit' :key='suit'/>
</div>
</template>

<script>
import Row from '@/components/Row.vue';

export default {
  name: 'Home',
  components: {
    Row,
  },
  data() {
    return {
      suits: ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    };
  },
};
</script>

<style>

#top {
  height: 300px;
  display: flex;
  justify-content: space-between;
}
#cards {
  max-width: 800px;
}
.half {
  width: 375px;
  border: 1px solid black;
}

#controls {
}
</style>
