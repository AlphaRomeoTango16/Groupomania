<template>
  <b-modal :id="'addComment'+post.id" hide-footer title="Créer un commentaire">
    <div class="d-block text-center">
      <b-form>
        <div>
          <b-form-textarea
          id="commentContent"
          placeholder="Écrivez votre contenu"
          v-model="form.content"
          rows="5"
          max-rows="10"
          ></b-form-textarea>
        </div>
        <br>
        <div>
          <b-form-file
            id="commentPicture" type="file" name="picture" 
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
      <b-button @click="$bvModal.hide('addComment'+post.id)">Annuler</b-button>
      <b-button class="ml-2" variant="primary" @click="sendComment">Envoyer</b-button>
    </div>
  </b-modal>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'CreateNewComment',
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
      type: Object,
    },
    post: {
      type: Object
    }
  },
  methods: {
      sendComment() {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;
        let postId = this.post.id;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          content: document.getElementById("commentContent").value
        }

        let formData = new FormData();
        formData.append("comment", JSON.stringify(data));
        formData.append("image", document.getElementById("commentPicture").files[0]);  

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
        };

        let url = "http://localhost:3000/api/comment/" + postId;

        fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => {this.$bvModal.hide('createComment')})
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
              }
    }
}
</script>

