<template>
  <div class="registration-cssave">
    <form>
      <h3 class="text-center">Форма регистрации</h3>
      <div class="form-group">
        <input
          class="form-control item" type="text" placeholder="Имя" required
          v-model="name"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control item" type="text" placeholder="Фамилия"
          v-model="surname"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control item" type="email" name="email" id="email" placeholder="Email" required
          v-model="email"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control item" type="password" placeholder="Пароль" required
          v-model="password"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control item" type="password" placeholder="Подтверждение пароля" required
          v-model="password_confirmation"
        >
      </div>
      <div class="form-group">
        <button
          class="btn btn-primary btn-block create-account"
          style="cursor: pointer"
          @click.prevent="registerUser"
        >
          Регистрировать
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'RegisterView',
  data: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: ''
  }),
  computed: {
    ...mapState(['authorized'])
  },
  methods: {
    ...mapActions(['register']),
    registerUser() {
      this.register({
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(() => {
        console.log('Register component done');
      })
    }
  },
  watch: {
    authorized(val) {
      val ? this.$router.push('/home') : null;
    }
  },
  beforeMount() {
    if (this.authorized) {
      this.$router.push('/home')
    }
  }
}
</script>
