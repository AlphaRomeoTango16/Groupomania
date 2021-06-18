<template>
  <div id="app">
    <router-view/>
      <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link> |
      <router-link to="/contact">Contacts</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 100%;
  position: fixed;
  padding: 30px;
  bottom: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fd2c02;
    }
  }
}
</style>
