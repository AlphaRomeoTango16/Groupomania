<template>
  <b-modal id="deleteProfile" hide-footer title="Supprimer mon profile">
    <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
    <div>
      <b-button @click="$bvModal.hide('deleteProfile')">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="deleteProfile">Je suis sûr</b-button>
    </div>
  </b-modal>
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
        let emailAddress = user.emailAddress;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          emailAddress: emailAddress,
        }

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/api/auth/delete", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => localStorage.clear())
        .then(() => this.$router.push('/Connection'))
        .catch(error => console.log('error', error));
              }
    }
}
</script>

