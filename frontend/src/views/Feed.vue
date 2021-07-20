<template>
<div id="feed_page">
  <header>
  <div id="navbar">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand to="/"><img id="logo" alt="Groupomania logo" src="../assets/white_logo.svg"></b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
          <template #button-content id="profile">
            <em>{{ user.firstName }} {{ user.lastName }}</em>
          </template>
          <b-dropdown-item @click="$bvModal.show('createPost')">Créer un post</b-dropdown-item>
            <CreateNewPost></CreateNewPost>
          <b-dropdown-item @click="$bvModal.show('deleteProfile')">Supprimer mon profile</b-dropdown-item>
            <DeleteProfile></DeleteProfile>
          <b-dropdown-item @click.prevent="logout">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  </header>
  <body>
  <div id="feed_list">
    <Post
    v-for="(post, pt) in posts"
    :key="pt"
    v-bind:post="post"
    v-bind:comments="post.Comments"
    >
    </Post>
  </div>
  </body>
</div>
</template>

<style lang="scss">

#navbar #logo {
  width: 30%;
}

#__BVID__11__BV_toggle_ {
  display: flex;
  align-items: center;
}

#avatarNav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#avatarNav p {
  margin-left: 5%;
  margin-bottom: 0px;
}

#feed_page {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#feed_list {
  flex-direction: row;
  margin-top: 15%;
  margin-left: 15%;
  margin-right: 15%;
}

@media all and (min-width: 250px) and (max-width: 600px) {
  
  #feed_list {
    margin-top: 30%;
  }
}

@media all and (min-width: 600px) and (max-width: 2500px) {
  
  #feed_list {
    margin-top: 10%;
  }
}

</style>

<script>
import Post from '../components/Post.vue'
import CreateNewPost from '../components/CreateNewPost.vue'
import DeleteProfile from '../components/DeleteProfile.vue'

export default {
	name: 'Feed',
	components: {
		Post,
    CreateNewPost,
    DeleteProfile
	},
  props: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    imageUrl: {
      type: String
    }
  },
  data() {
    return {
      posts: [],
      user: {}
    }
  },
  mounted: function() {
      this.loadUser();
      this.loadPosts();
  },
  methods: {
    loadUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      let bearerToken = "Bearer" + ' ' + token;
      let userId = user.userId;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearerToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = "http://localhost:3000/api/auth/" + userId;

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => console.log(this.user = result))
        .catch(error => console.log('error', error));
    },
    loadPosts() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/post/", requestOptions)
        .then(response => response.json())
        .then(result => {this.posts = result})
        .catch(error => console.log('error', error));
    },
    createPost(event) {
      event.preventDefault()
      this.$router.push('/createPost');
    },
    editProfile(event) {
      event.preventDefault()
      this.$router.push('/editProfile');
    },
    logout(event) {
      event.preventDefault()
      localStorage.clear()
      this.$router.push('/Connection');
    }
  }
}


</script>
