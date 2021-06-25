<template>
 <div class="register">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Votre prénom"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.firstname"
          type="name"
          placeholder="Entrer votre prénom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Votre nom"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.lastname"
          type="name"
          placeholder="Entrer votre nom de famille"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Votre adresse e-mail"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          placeholder="Entrer votre adresse e-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Votre mot de passe" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Votre photo de profile" label-for="input-5">
      <b-form-file v-model="file1" :state="Boolean(file1)" placeholder="Choississez une image ou glisser là ici" drop-placeholder="Glissez votre image ici">
      </b-form-file>
        <div class="mt-3">Image sélectionné : {{ file1 ? file1.name : '' }}</div>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary">S'inscrire</b-button>
      </div>
    </b-form>
  </div>
</template>

<style lang="scss">
.register {
    background-color: rgb(216, 216, 216);
    margin-top: 50px;
    padding: 20px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    border: 1px solid darkgray;
} 

</style>

<script>

</script>
