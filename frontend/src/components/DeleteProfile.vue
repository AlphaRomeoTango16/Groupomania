<template>
<html lang="fr">
  <b-modal id="deleteProfile" hide-footer title="Supprimer mon profile">
    <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
    <div>
      <b-button @click="$bvModal.hide('deleteProfile')">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="deleteProfile">Je suis sûr</b-button>
    </div>
  </b-modal>
</html>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'deleteProfile',
    data() {
      return {
        form: {
          user: {
            emailAddress: '',
          }
        }
      }
  },
  props: {
  },
  methods: {
      deleteProfile() {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;
        let emailAddress = user.email;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "emailAddress": emailAddress
        });

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/auth/delete", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(() => localStorage.clear())
          .then(() => this.$router.push('/'))
          .catch(error => console.log('error', error));
              }
    }
}
</script>

