<template>
<html lang="fr">
 <div class="connection">
    <b-form @submit="onConnection" v-if="show">
      <h1>Se connecter</h1>
      <b-form-group
        id="input-group-1"
        label="Votre adresse e-mail"
        label-for="input-1"
      >
        <b-form-input
          id="emailAddress"
          v-model="form.email"
          type="email"
          placeholder="Entrer votre e-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Votre mot de passe" label-for="input-2">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button id="submit" type="submit" variant="primary">Connexion</b-button>
      </div>
    </b-form>
    <div>
      <router-link :to="{ name: 'Home' }">Retourner à l'accueil</router-link>
    </div>
  </div>
</html>
</template>

<style lang="scss">
.connection {
    background-color: rgb(216, 216, 216);
    margin-top: 50px;
    padding: 20px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    border: 1px solid darkgray;
}

@media all and (min-width: 375px) and (max-width: 780px) {
  .connection {
    width: 300px;
  }

  h1 {
    font-size: 1.7em;
  }

 #submit {
   margin-bottom: 20px;
  }

}

</style>

<script>
export default {
    data() {
      return {
        form: {
          emailAddress: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onConnection(event) {
        event.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const data = {
          emailAddress: document.getElementById("emailAddress").value,
          password: document.getElementById("password").value
      }

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/auth/login", requestOptions)
          .then((response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Invalid User')
            }
          }))
          .then(result => {localStorage.setItem("user", JSON.stringify(result))})
          .then(() => {this.$router.push('/feed')})
          .catch(error => console.log('error', error));
              }
    }
  }
</script>
