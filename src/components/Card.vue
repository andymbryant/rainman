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
    border-radius: 15px;
    border: 1px solid black;
    height: 100%;
    width: 100%;
  }
</style>
