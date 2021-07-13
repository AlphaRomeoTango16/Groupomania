<template>
<div id="post">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="post.User.imageUrl"></b-avatar>
        <p>{{ post.User.firstName }} {{ post.User.lastName }}</p>
      </span>
      <span id="buttons" v-show="editButtons()">
        <b-button-group class="mx-1">
        <b-button class="btn btn-warning" @click="editPost(postId, title, content, imageUrl)">Modifier</b-button>
        <b-button class="btn btn-danger" @click="deletePost(postId)">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-text>{{ post.content }}</b-card-text>
      <img id="image" :src="post.imageUrl"/>
    </div>
    <div id="footer">
      <b-link id="commentButton" variant="primary" @click="addComment(postId)">Ajouter un commentaire</b-link>
      <span>Publié le {{ formatedDate }}</span>
    </div>
  </b-card>
  <Comment
  v-for="(comment, ct) in comments"
  :key="ct"
  v-bind:comment="comment"
  ></Comment>
</div>
</template>

<style lang="scss">
#post {
  margin-top: 5%;
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
    post: {
      type: Object
    },
    User: {
      type: Object
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
      let createdDate = this.post.createdAt;
      let updatedDate = this.post.updatedAt;
      let primitiveCreatedDate = createdDate.valueOf();
      let primitiveUpdatedDate = updatedDate.valueOf();
      if (primitiveUpdatedDate  > primitiveCreatedDate) {
        let date = new Date(primitiveUpdatedDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("fr-FR", options);
      } else {
        let date = new Date(primitiveCreatedDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("fr-FR", options);
      }
    }
  },
  mounted: function() {
    this.editButtons()
  },
  methods: {
    editButtons() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.userId == this.post.UserId || user.admin;
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

