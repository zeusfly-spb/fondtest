<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'HomeView',
  computed: {
    ...mapState(['authorized'])
  },
  watch: {
    authorized(val) {
      !val ? this.$router.push('/login') : null;
    }
  },
  beforeMount() {
    if (!this.authorized) {
      this.$router.push('/login');
    }
  }
}
</script>
