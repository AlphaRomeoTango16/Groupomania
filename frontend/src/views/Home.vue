<template>
<html lang="fr">
  <div class="home">
    <img alt="Groupomania logo" src="../assets/logo.svg">
    <h1>Accueil</h1>
    <span id="index">
      <router-link to="/Connection" id="connection">Connexion</router-link> /
      <router-link to="/Register" id="register">S'inscrire</router-link>
    </span>
  </div>
</html>
</template>

<style lang="scss">

#index {
  width: 200px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#connection {
  width: 100px;
}

#register {
  width: 100px;
}


.home img {
  width: 20%;
  display: block;
  margin: auto;
}

#nav {
  width: 100%;
  position: fixed;
  padding: 30px;
  bottom: 0;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #fd2c02;
    }
  }
}

</style>

<script>
</script>
