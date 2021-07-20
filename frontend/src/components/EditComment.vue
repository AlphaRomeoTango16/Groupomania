<template>
  <b-modal :id="'editComment'+comment.id" hide-footer title="Modifier mon commentaire">
    <div class="d-block text-center">
      <b-form>
        <div>
          <b-form-textarea
          id="content"
          :placeholder="comment.content"
          v-model="form.content"
          rows="5"
          max-rows="10"
          ></b-form-textarea>
        </div>
        <br>
        <div>
          <b-form-file
            id="picture" type="file" name="picture" 
            v-model="form.fileInput"
            :state="Boolean(form.fileInput)"
            placeholder="Choississez une image ou glisser là ici"
            drop-placeholder="Glissez votre image ici"
          ></b-form-file>
        </div>
      </b-form>
    </div>
    <br>
    <div>
      <b-button @click="$bvModal.hide('editComment'+comment.id)">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="modifyComment">Envoyer</b-button>
    </div>
  </b-modal>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'EditComment',
    data() {
      return {
          form: {
            comment: {
                content: ''
            },
            image: {
                fileInput: ''
            }
        }
      }
  },
  props: {
    comment: {
      type: Object
    },
    id: {
      type: [String, Number]
    }
  },
  methods: {
      /* Fonction pour envoyer le formulaire de modification de commentaire à l'API */
      modifyComment() {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;
        let commentId = this.comment.id;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          content: document.getElementById("content").value
        }

        let formData = new FormData();
        formData.append("comment", JSON.stringify(data));
        formData.append("image", document.getElementById("picture").files[0]);  

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
        };

        let url = "http://localhost:3000/api/comment/" + commentId;

        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => {this.$bvModal.hide('createPost')})
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
              }
    }
}
</script>

