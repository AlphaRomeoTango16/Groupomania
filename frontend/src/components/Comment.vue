<template>
<div id="comment">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="comment.User.imageUrl"></b-avatar>
        <p>{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
      </span>
      <span id="buttons" v-show="editButtons()">
        <b-button-group class="mx-1">
        <b-button class="btn btn-warning" @click="editComment(commentId, content, imageUrl)">Modifier</b-button>
        <b-button class="btn btn-danger" @click="deleteComment(commentId)">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-text> {{ comment.content }} </b-card-text>
      <img id="image" :src="comment.imageUrl"/>
    </div>
    <div id="footerComment">
      <span>Publié le {{ formatedDate }}</span>
    </div>
  </b-card>
</div>
</template>

<style lang="scss">
#comment .card-body {
  background-color: #e8e8e8;
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
  margin-top: 3%;
}

#image {
  width: 100%;
  object-fit: contain;
}

#footerComment {
  margin-top: 3%;
  display: flex;
  justify-content: flex-end;
}

</style>

<script>
export default {
  props: {
    comment: {
      type: Object
    }
  },
  name: 'Comment',
    data() {
      return {
      }
  },
  computed: {
    formatedDate: function() {
      let string = this.comment.createdAt;
      let date = new Date(string);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("fr-FR", options);
    }
  },
   mounted: function() {
    this.editButtons()
  },
  methods: {
    editButtons() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.userId == this.comment.UserId || user.admin;
    },  
    editComment(commentId, content, imageUrl) {
      this.$router.push({
        path: '/EditComment',
        query: { commentId, content, imageUrl }
      })
    },

    deleteComment(commentId) {

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

      let url = "http://localhost:3000/api/comment/" + commentId;

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
    },
  }
}

</script>

