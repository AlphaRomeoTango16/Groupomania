<template>
<div id="post">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="imageUser"></b-avatar>
        <p>{{ firstName }} {{ lastName }}</p>
      </span>
      <span id="buttons" v-show="editButtons(postUserId) === true">
        <b-button-group class="mx-1">
        <b-button class="btn btn-warning" @click="editPost(postId, title, content, imageUrl)">Modifier</b-button>
        <b-button class="btn btn-danger" @click="deletePost(postId)">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-title>{{ title }}</b-card-title>
      <b-card-text>{{ content }}</b-card-text>
      <img id="image" :src="imageUrl"/>
    </div>
    <div id="footer">
      <b-link id="commentButton" variant="primary" @click="addComment">Ajouter un commentaire</b-link>
      <span>Publié le {{ formatedDate }}</span>
    </div>
  </b-card>
  <Comment
  v-for="comment in comments"
  :key="comment"
  v-bind:commentId="comment.id"
  v-bind:commentPostId="comment.postId"
  v-bind:commentUserId="comment.userId"
  v-bind:content="comment.content"
  v-bind:imageUrl="comment.imageUrl"
  v-bind:createdDate="comment.createdAt"
  ></Comment>
</div>
</template>

<style lang="scss">
#post {
  margin-bottom: 5%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#avatar {
  display: flex;
  align-items: center;
}

#avatar p {
  width: 200px;
  margin-left: 5%;
  margin-bottom: 0;
}

#body {
  margin-top: 5%;
}

#image {
  width: 100%;
  height: 300px;
  object-fit: scale-down;
}

#footer {
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
}

@media all and (min-width: 300px) and (max-width: 780px){

    #header {
    flex-direction: column;
    align-items: flex-start;
  }
    #avatar {
    margin-bottom: 3%;
  }
}

</style>

<script>
import Comment from '../components/Comment.vue'

export default {
  components: {
    Comment
  },
  props: {
    title: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    imageUrl: {
      type: String
    },
    content: {
      type: String
    },
    imageUser: {
      type: String
    },
    postId: {
      type: Number
    },
    postUserId: {
      type: Number
    },
    createdDate: {
      type: String
    },
    comments : {
      type: Array
    }
  },
  name: 'Post',
  data() {
    return {
      Comments: [],
    }
  },
  computed: {
    formatedDate: function() {
      let string = this.createdDate;
      let date = new Date(string);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("fr-FR", options);
    }
  },
  mounted: function() {
    this.editButtons()
    this.loadComment()
  },
  methods: {
    editButtons(postUserId) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userId;
      let admin = user.admin;
      if (id == postUserId || admin == true){
        return true
      }
    },
    editPost(postId, title, content, imageUrl) {
      this.$router.push({
        path: '/EditPost',
        query: { postId, title, content, imageUrl }
      })
    },

    deletePost(postId) {

      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let bearerToken = "Bearer" + ' ' + token;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearerToken);

      var raw = "";

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = "http://localhost:3000/api/post/" + postId;

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
    },
    addComment(postId) {
      this.$router.push({
        path: '/CreateComment',
        query: { postId }
      })
    }
  }
}

</script>

