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
        <b-button class="btn btn-warning">Modifier</b-button>
        <b-button class="btn btn-danger">Supprimer</b-button>
      </b-button-group>
      </span>
    </div>
    <div id="body">
      <b-card-title>{{ title }}</b-card-title>
      <b-card-text> {{ content }} </b-card-text>
      <img id="image" :src="imageUrl"/>
    </div>
  </b-card>
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
  margin-top: 3%;
}

#image {
  width: 100%;
  object-fit: contain;
}

</style>

<script>
export default {
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
    }
  },
  name: 'Post',
  methods: {
  }
}

</script>

