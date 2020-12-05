<template>
  <div class='row'>
    <RowCell :suit='suit'/>
    <Card v-for='card in cards' :value='card' :key='card'/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import RowCell from '@/components/RowCell.vue';

export default {
  name: 'Row',
  components: {
    RowCell,
    Card,
  },
  props: {
    suit: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cards: ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'],
    };
  },
};
</script>

<style scoped>
.row {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

</style>
