<template>
  <b-modal id="createPost" hide-footer title="Créer un post">
    <div class="d-block text-center">
      <b-form>
        <div>
          <b-form-textarea
          id="postTitle"
          placeholder="Écrivez votre titre"
          v-model="form.title"
          rows="1"
          max-rows="1"
          ></b-form-textarea>
        </div>
        <br>
        <div>
          <b-form-textarea
          id="postContent"
          placeholder="Écrivez votre contenu"
          v-model="form.content"
          rows="5"
          max-rows="10"
          ></b-form-textarea>
        </div>
        <br>
        <div>
          <b-form-file
            id="postPicture" type="file" name="picture" 
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
      <b-button @click="$bvModal.hide('createPost')">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="sendPost">Envoyer</b-button>
    </div>
  </b-modal>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'CreateNewPost',
    data() {
      return {
          form: {
            post: {
                title: '',
                content: ''
            },
            image: {
                fileInput: ''
            }
        }
      }
  },
  props: {
    post: {
      type: Object
    },
  },
  methods: {
      /* Fonction pour envoyer le formulaire de création de post à l'API */
      sendPost() {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          title: document.getElementById("postTitle").value,
          content: document.getElementById("postContent").value
        }

        let formData = new FormData();
        formData.append("post", JSON.stringify(data));
        formData.append("image", document.getElementById("postPicture").files[0]);  

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/api/post/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => {this.$bvModal.hide('createPost')})
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
              }
    }
}
</script>

