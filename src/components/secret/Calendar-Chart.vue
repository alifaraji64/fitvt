<template>
  <section>
    <div class="calendar">
      <vc-date-picker v-model="date" is-dark />
    </div>

    <div class="chart">
      <p>activity</p>
      <trend
        :data="data"
        :gradient="['#008cff', '#008cff', '#008cff']"
        auto-draw
        smooth
        stroke-width="3"
        id="chart"
      ></trend>
      <span>last 7 days</span>
    </div>
    <div class="create-workout" v-if="!isInCreatePage">
      <router-link to="/secret/profile/create-workout">
        <i class="fas fa-plus"></i>
        create new workout
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      data: [],
    };
  },
  computed: {
    isInCreatePage() {
      return this.$router.currentRoute.path == "/secret/profile/create-workout";
    },
  },
  mounted() {
    this.data = this.$store.state.activity;
    console.log(this.data);
  },
    watch: {
    '$store.state.activity': {
      handler: function (n) {
        console.log('a thing changed')
        this.data = n
      },
      deep: true
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/../public/sass/_variables.scss";
@import "@/../public/sass/_globals.scss";
@import "@/../public/sass/_calendar-chart.scss";
</style>