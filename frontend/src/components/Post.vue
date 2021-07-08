<template>
<div id="post">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="imageUser"></b-avatar>
        <p>{{ firstName }} {{ lastName }}</p>
      </span>
      <span id="buttons" v-show="userAuth">
        <b-button-group class="mx-1">
        <b-button class="btn btn-warning" @click="editPost(postId)">Modifier</b-button>
        <b-button class="btn btn-danger" @click="deletePost(postId)">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-title>{{ title }}</b-card-title>
      <b-card-text> {{ content }}</b-card-text>
      <img id="image" :src="imageUrl"/>
    </div>
    <div id="footer">
      <b-button id="commentButton" variant="primary" @click="addComment">Ajouter un commentaire</b-button>
    </div>
  </b-card>
  <Comment
  v-for="comment in comments"
  :key="comment"
  v-bind:content="comment.content"
  ></Comment>
</div>
</template>

<style lang="scss">
#post {
  margin-bottom: 5%;
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
  object-fit: contain;
}

#footer {
  margin-top: 3%;
  display: flex;
}

#commentButton {
  margin-left: auto;
  margin-right: auto;
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
    }
  },
  name: 'Post',
  data() {
    return {
      Comments: [],
      userAuth: true,
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
        this.userAuth = true
      }
    },
    editPost(postId) {
      this.$router.push({
        path: '/EditPost',
        query: { postId }
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
    addComment(event) {
      event.preventDefault()
      this.$router.push('/createComment');
    }
  }
}

</script>

