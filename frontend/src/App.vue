<template>
  <div id="app">
    <nav>
      <NavLink url="/" text="Accueil" />
      <NavLink url="/about" text="À propos" />
      <NavLink url="/contact" text="Contact" />
    </nav>
    <p>Bienvenue sur notre page d'<NavLink/></p>
  </div>
</template>

<script>
import NavLink from './components/NavLink.vue'

export default {
  name: 'App',
  components: {
    NavLink
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
