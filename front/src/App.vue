<template>
  <div id="app">
    <notifications
      position="top center"
    />
    <nav>
      <router-link
        to="/register"
        v-show="$route.name === 'login'"
      >
        Регистрация
      </router-link>
      <router-link
        to="/login"
        v-show="$route.name === 'register'"
      >
        Вход
      </router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
a {
  color: white;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
 background-color:#214c84;
 background-blend-mode:overlay;
 display:flex;
 align-items:center;
 justify-content:center;
 background-repeat:no-repeat;
 background-size:cover;
 height:100%;
}
body {
  background-color:transparent;
}
.registration-cssave{
  padding:50px 0;
}

.registration-cssave form {
  max-width:800px;
  padding:50px 70px;
  border-radius:10px;
  box-shadow:4px 4px 15px rgba(0, 0, 0, 0.2);
  background-color:#fff;
}

.registration-cssave form h3 {
  font-weight:bold;
  margin-bottom:30px;
}

.registration-cssave .item {
  border-radius:10px;
  margin-bottom:25px;
  padding:10px 20px;
}

.registration-cssave .create-account {
  border-radius:30px;
  padding:10px 20px;
  font-size:18px;
  font-weight:bold;
  background-color:#3f93ff;
  border:none;
  color:white;
  margin-top:20px;
}

@media (max-width: 576px) {
  .registration-cssave form {
    padding:50px 20px;
  }
}

</style>
<script setup>
</script>