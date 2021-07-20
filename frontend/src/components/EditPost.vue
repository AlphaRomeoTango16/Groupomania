<template>
  <b-modal :id="'editPost'+post.id" hide-footer title="Modifier mon post">
    <div class="d-block text-center">
      <b-form>
        <div>
          <b-form-textarea
          id="title"
          :placeholder="post.title"
          v-model="form.title"
          rows="1"
          max-rows="1"
          ></b-form-textarea>
        </div>
        <br>
        <div>
          <b-form-textarea
          id="content"
          :placeholder="post.content"
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
      <b-button @click="$bvModal.hide('editPost'+post.id)">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="modifyPost">Envoyer</b-button>
    </div>
  </b-modal>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'EditPost',
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
      type: Object,
      id: [String, Number]
    },
  },
  methods: {
      /* Fonction pour envoyer le formulaire de modification de post à l'API */
      modifyPost() {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;
        let postId = this.post.id;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          title: document.getElementById("title").value,
          content: document.getElementById("content").value
        }

        let formData = new FormData();
        formData.append("post", JSON.stringify(data));
        formData.append("image", document.getElementById("picture").files[0]);  

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
        };

        let url = "http://localhost:3000/api/post/" + postId;

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

