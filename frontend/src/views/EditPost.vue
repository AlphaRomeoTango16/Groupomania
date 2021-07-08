<template>
 <div class="createPost">
    <b-form @submit="sendPost">
    <div>
        <h1>Modifier votre post</h1>
        <b-form-textarea
        id="title"
        v-model="form.title"
        placeholder="Écrivez votre titre"
        rows="1"
        max-rows="1"
        ></b-form-textarea>

        <pre class="mt-3 mb-0">{{ text }}</pre>
    </div>
    <div>
        <b-form-textarea
        id="content"
        v-model="form.content"
        placeholder="Écrivez votre contenu"
        rows="5"
        max-rows="10"
        ></b-form-textarea>

        <pre class="mt-3 mb-0">{{ text }}</pre>
    </div>

    <div>
      <b-form-file id="image" type="file" name="image" v-model="form.fileInput" :state="Boolean(fileInput)" placeholder="Choississez une image ou glisser là ici" drop-placeholder="Glissez votre image ici">
      </b-form-file>
    </div>

    <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary">Modifier</b-button>
    </div>
    </b-form>
  </div>
</template>

<style lang="scss">
.createPost {
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
                title: '',
                content: ''
            },
            image: {
                fileInput: ''
            }
        }
      }
    },
    methods: {
      sendPost() {
        }
    }
  }
</script>
