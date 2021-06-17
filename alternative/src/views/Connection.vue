<template>
 <div class="connection">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Votre adresse e-mail"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Entrer votre e-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Votre mot de passe" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Connexion</b-button>
    </b-form>
  </div>
</template>

<style lang="scss">
.connection {
    padding: 20px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    border-color: black;
    border-width: 10px;
} 

</style>

<script>
export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
