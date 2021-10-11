<template>
  <div class="home">
    <div class="background"></div> 
    <div class="filter"></div>
    <div class="menu">
      <span id="index">
        <img alt="Groupomania logo" src="../assets/logo.svg">
          <div class="button">
            <router-link to="/Connection" class="font-weight-bold" id="connection">Connexion</router-link> /
            <router-link to="/Register" class="font-weight-bold" id="register">S'inscrire</router-link>
          </div>
      </span>
    </div>
  </div>
</template>

<style lang="scss">

#index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#connection {
  width: 100px;
  color: rgb(2, 6, 226);
}

#register {
  width: 100px;
  color: rgb(2, 6, 226);
}

.home {
  width: 100%;
  height: 100%;
}

.home img {
  width: 50%;
}

.background {
  position: absolute;
  z-index: 0;
  background-image: url(../assets/Team.jpeg);
  filter: blur(3px);
  width: 100%;
  height: 100%;
  background-size: cover;
}

.filter {
  position: absolute;
  background: red;
  opacity: 0.50;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.menu {
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid white;
  border-radius: 20px 0px 0px 0px;
  display: flex;
  justify-content: center;
  right: 0;
  bottom: 0;
  width: 30%;
  height: 30%;
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
