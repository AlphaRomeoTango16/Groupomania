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
        <b-button class="btn btn-warning" @click="$bvModal.show('editPost'+post.id)">Modifier</b-button>
          <EditPost
            v-bind:post="post"
          ></EditPost>
        <b-button class="btn btn-danger" @click="deletePost()">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-text>{{ post.content }}</b-card-text>
      <img v-show="showImage()" id="image" :src="post.imageUrl"/>
    </div>
    <div id="footer">
      <b-link id="commentButton" variant="primary" @click="$bvModal.show('addComment'+post.id)">Ajouter un commentaire</b-link>
         <CreateNewComment
          v-bind:post="post"
          ></CreateNewComment>
      <span id="datePost">{{ formatedDate }}</span>
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

#datePost {
  font-size: 0.9em;
}

@media all and (min-width: 375px) and (max-width: 780px){

    #header {
    flex-direction: column;
    align-items: flex-start;
  }
    #avatar {
    margin-bottom: 10%;
    width: 200px;
  }
    .card-title {
    font-size: 1em;
  }
  .card-text {
    font-size: 0.9em;
  }
  #datePost {
    font-size: 0.7em;
  }
  #commentButton {
    font-size: 0.9em;
    margin-bottom: 5%;
  }
  #footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>

<script>
import Comment from '../components/Comment.vue'
import EditPost from '../components/EditPost.vue'
import CreateNewComment from '../components/CreateNewComment.vue'

export default {
  components: {
    Comment,
    CreateNewComment,
    EditPost
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
    },
    posts : {
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
      const createdDate = this.post.createdAt;
      const dateC = new Date(createdDate);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const fCreatedDate = dateC.toLocaleDateString("fr-FR", options);

      const updatedDate = this.post.updatedAt;
      const dateU = new Date(updatedDate);
      const fUpdateddDate = dateU.toLocaleDateString("fr-FR", options);

      if (fUpdateddDate  > fCreatedDate) {
        return "Mis à jour le" + ' ' + fUpdateddDate;
      } else {
        return "Publié le" + ' ' + fCreatedDate;
      }
    }
  },
  mounted: function() {
    this.editButtons()
    this.showImage()
  },
  methods: {
    editButtons() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.userId == this.post.UserId || user.admin;
    },
    showImage() {
      return this.post.imageUrl != undefined;
    },
    deletePost() {

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

      let url = "http://localhost:3000/api/post/" + this.post.id;

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
    },
  }
}

</script>

