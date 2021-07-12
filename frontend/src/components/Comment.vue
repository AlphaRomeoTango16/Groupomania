<template>
<div id="comment">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="commentImageUser"></b-avatar>
        <p>{{ commentFirstName }} {{ commentLastName }}</p>
      </span>
      <span id="buttons" v-show="editButtons(commentUserId) === true">
        <b-button-group class="mx-1">
        <b-button class="btn btn-warning" @click="editComment(commentId, content, imageUrl)">Modifier</b-button>
        <b-button class="btn btn-danger" @click="deleteComment(commentId)">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-text> {{ commentContent }} </b-card-text>
      <img id="image" :src="commentImageUrl"/>
    </div>
    <div id="footerComment">
      <span>Publié le {{ formatedDate }}</span>
    </div>
  </b-card>
</div>
</template>

<style lang="scss">
#comment {
  margin-bottom: 5%;
}

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
    commentFirstName: {
      type: String
    },
    commentLastName: {
      type: String
    },
    commentImageUrl: {
      type: String
    },
    commentContent: {
      type: String
    },
    commentImageUser: {
      type: String
    },
    commentCreatedDate: {
      type: String
    },
    commentId: {
      type: Number
    },
    commentPostId: {
      type: Number
    }
  },
  name: 'Comment',
    data() {
      return {
      }
  },
  computed: {
    formatedDate: function() {
      let string = this.commentCreatedDate;
      let date = new Date(string);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString("fr-FR", options);
    }
  },
   mounted: function() {
    this.editButtons()
  },
  methods: {
    editButtons(commentUserId) {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userId;
      let admin = user.admin;
      if (id == commentUserId || admin == true){
        return true
      }
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

