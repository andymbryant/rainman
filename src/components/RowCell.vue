<template>
  <div class='row-cell-ctr'>{{suitLetter}}</div>
</template>

<script>
export default {
  name: 'RowCell',
  props: {
    suit: {
      type: String,
      required: true,
    },
  },
  computed: {
    suitLetter() {
      return this.suit.charAt(0).toUpperCase();
    },
  },
};
</script>

<style scoped>
  .row-cell-ctr {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
