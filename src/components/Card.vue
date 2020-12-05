<template>
  <div class='card-ctr'>{{value}}</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    value: String,
    required: () => true,
  },
  mounted() {
  },
};
</script>

<style scoped>
  .card-ctr {
    border-radius: 10px;
    border: 1px solid black;
    height: 60px;
    width: 100%;
  }
</style>
