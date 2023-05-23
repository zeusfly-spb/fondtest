<template>
  <div class="registration-cssave">
    <form>
      <h3 class="text-center">Форма входа</h3>
      <div class="form-group">
        <input
          class="form-control item" type="email" placeholder="Email" required
          v-model="email"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control item" type="password" name="Пароль" minlength="6" placeholder="Пароль" required
          v-model="password"
        >
      </div>
      <div class="form-group">
        <button
          class="btn btn-primary btn-block create-account"
          @click.prevent="logIn"
        >
          Вход
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginView',
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapState(['authorized'])
  },
  methods: {
    ...mapActions(['login']),
    async logIn() {
      try {
        await this.login({email: this.email, password: this.password});
        this.$notify({
          title: 'Авторизация',
          text: 'Вы успешно авторизовались!',
          type: 'success',
        });
      } catch (e) {
        this.$notify({
          title: 'Авторизация',
          text: 'Ошибка авторизации! Проверьте правильность введенных данных!',
          type: 'error',
        });
      }
    }
  },
  watch: {
    authorized(val) {
      val ? this.$router.push('/') : null;
    }
  },
  beforeMount() {
    if (this.authorized) {
      this.$router.replace('/');
    }
  }
}
</script>
