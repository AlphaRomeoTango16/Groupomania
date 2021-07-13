<template>
 <div class="editProfile">
    <b-form @submit="modifyProfile(userId)">
    <b-form-group
        id="input-group-1"
        label="Votre prénom"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          name="firstName"
          v-model="form.firstName"
          type="name"
          placeholder="Entrer votre prénom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Votre nom"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          name="lastName"
          v-model="form.lastName"
          type="name"
          placeholder="Entrer votre nom de famille"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Votre adresse e-mail"
        label-for="emailAddress"
      >
        <b-form-input
          id="emailAddress"
          name="emailAddress"
          v-model="form.emailAddress"
          type="email"
          placeholder="Entrer votre adresse e-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Votre mot de passe" label-for="password">
        <b-form-input
          id="password"
          name="password"
          type="password"
          v-model="form.password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Votre photo de profile" label-for="image">
      <b-form-file id="image" type="file" name="image" v-model="form.fileInput" :state="Boolean(fileInput)" placeholder="Choississez une image ou glisser là ici" drop-placeholder="Glissez votre image ici">
      </b-form-file>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary">Modifier mon profile</b-button>
      </div>
    </b-form>
  </div>
</template>

<style lang="scss">
.editProfile {
    background-color: rgb(216, 216, 216);
    margin-top: 50px;
    padding: 20px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    border: 1px solid darkgray;
}

.d-flex {
    margin-top: 5%;
}

</style>

<script>
export default {
    data() {
      return {
        form: {
          user: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: ''
          },
          image: {
            fileInput: ''
          }
        }
      }
    },
    methods: {
      
    }
  }
</script>
