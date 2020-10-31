<template>
  <div class="loading-page">
    <pulseLoader :color="color" :size="size"></pulseLoader>
  </div>
</template>

<script>
import pulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: {
    pulseLoader,
  },
  data() {
    return {
      loading: true,
      color: "#008cff",
      size: "50px",
    };
  },
};
</script>

<style>
</style>