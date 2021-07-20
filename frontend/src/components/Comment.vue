<template>
<div id="comment">
  <b-card>
    <div id="header">
      <span id="avatar">
        <b-avatar :src="comment.User.imageUrl" alt="avatar commentaire"></b-avatar>
        <p>{{ comment.User.firstName }} {{ comment.User.lastName }}</p>
      </span>
      <span id="buttons" v-show="editButtons()">
        <b-button-group size="sm" class="mx-1">
        <b-button class="btn btn-warning" @click="$bvModal.show('editComment'+comment.id)">Modifier</b-button>
          <EditComment
            v-bind:comment="comment"
          ></EditComment>
        <b-button class="btn btn-danger" @click="deleteComment()">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-text> {{ comment.content }} </b-card-text>
      <img v-show="showImage()" id="image" alt="Image du commentaire"  :src="comment.imageUrl"/>
    </div>
    <div id="footerComment">
      <span>{{ formatedDate }}</span>
    </div>
  </b-card>
</div>
</template>

<style lang="scss">
#comment .card {
  border: 1px solid #797979;
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
  font-size: 0.9em;
}

@media all and (min-width: 250px) and (max-width: 600px){

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
  #footerComment {
    font-size: 0.7em;
  }
}


</style>

<script>
import EditComment from '../components/EditComment.vue'

export default {
  components: {
    EditComment
  },
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
    /* Fonction pour indiquer soit la date de création, soit la date de modification ainsi que sa mise en forme au format FR */
    formatedDate: function() {
          const createdDate = this.comment.createdAt;
          const dateC = new Date(createdDate);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const fCreatedDate = dateC.toLocaleDateString("fr-FR", options);

          const updatedDate = this.comment.updatedAt;
          const dateU = new Date(updatedDate);
          const fUpdateddDate = dateU.toLocaleDateString("fr-FR", options);

          if (updatedDate  > createdDate) {
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
    /* Fonction pour afficher les boutons "modifier" et "supprimer" en fonction de l'utilisateur */
    editButtons() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.userId == this.comment.UserId || user.admin;
    },

    /* Fonction pour ne pas afficher d'img si il n'y a pas d'image associé au post */
    showImage() {
      return this.comment.imageUrl != undefined;
    },
    
    /* Fonction pour supprimer un post */
    deleteComment() {

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

      let url = "http://localhost:3000/api/comment/" + this.comment.id;

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(() => { this.$router.go()})
        .catch(error => console.log('error', error));
    },
  }
}

</script>

