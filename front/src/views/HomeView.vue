<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'HomeView',
  computed: {
    ...mapState(['authorized'])
  },
  methods: {
    ...mapActions(['details'])
  },
  async mounted() {
    await this.details();
  }
}
</script>
