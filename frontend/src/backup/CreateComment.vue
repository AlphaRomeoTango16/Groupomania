<template>
 <div class="createComment">
    <b-form @submit="sendComment(postId)">
    <div>
        <h1>Créer votre commentaire</h1>
        <b-form-textarea
        id="content"
        v-model="form.content"
        placeholder="Écrivez votre contenu"
        rows="5"
        max-rows="10"
        ></b-form-textarea>
    </div>

    <div>
      <b-form-file id="image" type="file" name="image" v-model="form.fileInput" :state="Boolean(fileInput)" placeholder="Choississez une image ou glisser là ici" drop-placeholder="Glissez votre image ici">
      </b-form-file>
    </div>

    <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary">Envoyer</b-button>
    </div>
    </b-form>
  </div>
</template>

<style lang="scss">
.createComment {
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
            post: {
                content: ''
            },
            image: {
                fileInput: ''
            }
        }
      }
    },
    methods: {
      sendComment(postId) {

        let user = JSON.parse(localStorage.getItem("user"));
        let token = user.token;
        let bearerToken = "Bearer" + ' ' + token;
        postId = this.$route.query.postId;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearerToken);

        const data = {
          content: document.getElementById("content").value
        }

        let formData = new FormData();
        formData.append("comment", JSON.stringify(data));
        formData.append("image", document.getElementById("image").files[0]);  

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
        .then(() => {this.$router.push('/feed')})
        .catch(error => console.log('error', error));
              }
    }
  }
</script>
