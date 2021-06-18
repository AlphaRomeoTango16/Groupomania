<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg">
    <span id="index">     
      <router-link to="/Connection" id="connection">Connexion</router-link>/
      <router-link to="/Register" id="register">S'inscrire</router-link>
    </span>
  </div>
</template>

<style lang="scss">

#index {
  width: 200px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

#connection {
  width: 100px;
}

#register {
  width: 100px;
}


.home img {
  width: 20%;
}

</style>

<script>
</script>
