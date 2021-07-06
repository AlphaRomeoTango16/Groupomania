<template>
<div id="feed_page">
  <div id="navbar">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
      <b-navbar-brand to="/"><img id="logo" alt="Groupomania logo" src="../assets/white_logo.svg"></b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
          <template #button-content id="profile">
            <em>Profile</em>
          </template>
          <b-dropdown-item @click="createPost">Créer un post</b-dropdown-item>
          <b-dropdown-item @click="editProfile">Modifier profile</b-dropdown-item>
          <b-dropdown-item @click.prevent="logout">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <div id="feed_list">
    <Post
    v-for="post in posts"
    :key="post.id"
    v-bind:imageUrl="post.imageUrl"
    v-bind:title="post.title"
    v-bind:content="post.content"
    v-bind:firstName="post.User.firstName"
    v-bind:lastName="post.User.lastName"
    v-bind:imageUser="post.User.imageUrl"
    ></Post>
  </div>
</div>
</template>

<style lang="scss">

#navbar #logo {
  width: 30%;
}

#feed_page {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#feed_list {
  height: 90%;
  flex-direction: row;
  margin-top: 15%;
  margin-left: 20%;
  margin-right: 20%;
}

</style>

<script>
import Post from '../components/Post.vue'

export default {
	name: 'Feed',
	components: {
		Post
	},
  data() {
    return {
      posts: [],
      userAuth: false
    }
  },
  mounted: function() {
      this.loadPost()
  },
  methods: {
    loadPost() {
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
      this.$router.push('/createPost')
    },
    editProfile() {
      let post = this.posts;
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userId;
      let admin = user.admin;
      if (id == post.UserId || admin == true){
        this.userAuth = true
      }
    }
  }
}


</script>
