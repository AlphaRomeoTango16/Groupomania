<template>
<div id="feed_page">
  <div id="navbar">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/"><img id="logo" alt="Groupomania logo" src="../assets/white_logo.svg"></b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
          <template #button-content>
            <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click.prevent="logout">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <div id="feed_list">
    <Post />
  </div>
</div>
</template>

<style lang="scss">

#navbar #logo {
  width: 30%;
}

#feed_list {
  display: flex;
  justify-content: center;
  margin-top: 5%;
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
	}
}
</script>
